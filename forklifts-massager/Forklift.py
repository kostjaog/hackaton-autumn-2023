from datetime import datetime, timedelta
from random import randint, uniform
from config import path_lib,rabbit
from Task import TaskQueue
import pika
import json
import requests


class Path:
    """
    Path class.
    Store all attributes and methods of specific path from warehouse map
    """

    def __init__(self,
                 path_id: int
                 ):
        self.id = path_id  # unique id of the path
        self.target_rack_id = path_lib[self.id]["target_rack_id"]  # target rack in warehouse
        self.path_sequence = (path for path in path_lib[self.id][
            "path_sequence"])  # sequence of control points with their id, names and distance
        pass

    def get_next_checkpoint(self):
        # iterate over checkpoints forward
        try:
            point = self.path_sequence.__next__()
        # but when catch StopIteration exception revert points sequence and continue to iterate backward
        except StopIteration:
            self.path_sequence = (path for path in path_lib[self.id]["path_sequence"][::-1])
            raise StopIteration("You have reach the end of the path, time to solve your task and go back")
        else:
            return point


class Forklift:
    """
    Forklift class.
    Represents one specific forklift on warehouse
    """
     

    def __init__(self, forklift_id: int, warehouse_id: int, task_queue: TaskQueue):
        self.id = forklift_id  # unique id of forklift
        # random date of last maintenance
        self.last_service_date = datetime.today() - timedelta(days=(randint(10, 173)))
        self.warehouse_id = warehouse_id
        self.task_queue = task_queue
        self.task = None  # current task
        self.status = "chill"  # current status
        self.current_path = None
        self.path_direction = None  # path direction, if forward - forklift go to target, if bask - go to start point
        self.current_point = None
        self.next_point = None
        self.next_point_time = None
        self.speed = uniform(0.18, 0.22)
        
        payload ={"warehouse_name": "#"+str(warehouse_id), "name": forklift_id,"last_tm_date":self.last_service_date.isoformat()}
        r = requests.post('http://forklift-tracker.kostjaog.ru/api/forklifts', data=payload)
          # random speed in m/s
        # self.credentials = pika.PlainCredentials('rmuser', 'rmpassword')
        # self.connection = pika.BlockingConnection(pika.ConnectionParameters(host = rabbit['host'], port = rabbit['port'],virtual_host = '/',credentials = self.credentials))
        # self.channel = pika.BlockingConnection(pika.ConnectionParameters(host = rabbit['host'], port = rabbit['port'],virtual_host = '/',credentials = pika.PlainCredentials('rmuser', 'rmpassword'))).channel()

    def get_task(self):
        # method to get new task, if forklift is free and chilling
        self.task = self.task_queue.get_task()
        if self.task:
            print(
                f"Forklift #{self.id} of warehouse #{self.warehouse_id} "
                f"have started the task #{self.task.id} "
                f"at {datetime.now()}")
            self.current_path = Path(self.task.path_id)  # get Path object
            chanal = pika.BlockingConnection(pika.ConnectionParameters(host = rabbit['host'], port = rabbit['port'],virtual_host = '/',credentials = pika.PlainCredentials('rmuser', 'rmpassword'))).channel()
            chanal.basic_publish(exchange=rabbit['exchange'],routing_key="start_task",body=json.dumps({"warehouse_name": "#"+str(self.warehouse_id),"forklift_name": self.id,"timestamp": str(datetime.now().isoformat()),"target_point": str(self.current_path.target_rack_id)}))#f"Forklift #{self.id} of warehouse #{self.warehouse_id} "+f"have started the task #{self.task.id} "+f"at {datetime.now()}")
            chanal.close()

            self.task.start()  # change task status, maybe needed later. Or not =)
            
            self.current_point = self.current_path.get_next_checkpoint()  # and first point
            print(
                f"Forklift #{self.id} of warehouse #{self.warehouse_id} "
                f"have reach the point {self.current_point['check_point_name']} "
                f"at {datetime.now()}")
            
            chanal = pika.BlockingConnection(pika.ConnectionParameters(host = rabbit['host'], port = rabbit['port'],virtual_host = '/',credentials = pika.PlainCredentials('rmuser', 'rmpassword'))).channel()
            
            
            chanal.basic_publish(exchange=rabbit['exchange'],routing_key="reach_point",body =json.dumps({"warehouse_name": "#"+str(self.warehouse_id),"forklift_name": self.id,"point_name": str(self.current_point['check_point_name']),"timestamp": str(datetime.now().isoformat()),"target_point": str(self.current_path.target_rack_id)}) )#f"Forklift #{self.id} of warehouse #{self.warehouse_id} "+f"have reach the point {self.current_point['check_point_name']} "+f"at {datetime.now()}")
            chanal.close()

            self.next_point = self.current_path.get_next_checkpoint()  # get next point to know were to go
            self.next_point_time = datetime.now() + timedelta(
                seconds=self.current_point['next_check_point_distance'] / self.speed)  # calculate time to next point
            self.path_direction = "forward"
            self.status = 'working'
        else:
            pass
            # there can be message that there is no tasks in queue, but it's annoying
            # print(f"TaskQueue of warehouse #{self.warehouse_id} is empty "
            #       f"Forklift #{self.id} stay chill")
        if self.task.id == 42:
            print(f"Forklift #{self.id} say: 'Hmm.. seems like I found the answer to life the universe and everything'")

    def work(self):
        # first of all check status
        if self.status == 'chill':
            # if forklift chilling we need to make it work. We need, really?
            self.get_task()
        if self.status == 'working':
            # if forklift have next_point_time attribute - it have next point to go
            if self.next_point_time:
                # check if forklift reach the next point by time
                if datetime.now() > self.next_point_time:
                    # if forklift have next point - then let it go
                    if self.next_point:
                        print(
                            f"Forklift #{self.id} of warehouse #{self.warehouse_id} "
                            f"have reach the point {self.next_point['check_point_name']} "
                            f"at {datetime.now()}")
                        
                        chanal = pika.BlockingConnection(pika.ConnectionParameters(host = rabbit['host'], port = rabbit['port'],virtual_host = '/',credentials = pika.PlainCredentials('rmuser', 'rmpassword'))).channel()
            
                        chanal.basic_publish(exchange=rabbit['exchange'],routing_key="reach_point",body=json.dumps({"warehouse_name": "#"+str(self.warehouse_id),"forklift_name": self.id,"point_name": str(self.next_point['check_point_name']),"timestamp": str(datetime.now().isoformat()),"target_point": str(self.current_path.target_rack_id)}))#f"Forklift #{self.id} of warehouse #{self.warehouse_id} "+ f"have reach the point {self.next_point['check_point_name']} "+f"at {datetime.now()}")
                        chanal.close()
                        # reassign next point to current
                        self.current_point = self.next_point
                        # and try to get next point
                        try:
                            self.next_point = self.current_path.get_next_checkpoint()
                            # calculate next point time
                            self.next_point_time = datetime.now() + timedelta(
                                seconds=self.current_point['next_check_point_distance'] / self.speed)
                        except StopIteration:
                            # if there is no more points and forklift go forward - it reach the target
                            if self.path_direction == "forward":
                                print(
                                    f"Forklift #{self.id} of warehouse #{self.warehouse_id} "
                                    f"have reach the target {self.current_path.target_rack_id} "
                                    f"at {datetime.now()}")
                                
                                chanal = pika.BlockingConnection(pika.ConnectionParameters(host = rabbit['host'], port = rabbit['port'],virtual_host = '/',credentials = pika.PlainCredentials('rmuser', 'rmpassword'))).channel()
                                
                                # json.dump({"warehouse_name": "#"+str(self.warehouse_id),"forklift_name": self.id,"point_name": str(self.current_point['check_point_name']),"timestamp": str(datetime.now().isoformat()),"target_point": str(self.current_path.target_rack_id)})
                                chanal.basic_publish(exchange=rabbit['exchange'],routing_key='reach_target',body=json.dumps({"warehouse_name": "#"+str(self.warehouse_id),"forklift_name": self.id,"point_name": str(self.current_point['check_point_name']),"timestamp": str(datetime.now().isoformat()),"target_point": str(self.current_path.target_rack_id)}))#f"Forklift #{self.id} of warehouse #{self.warehouse_id} "+f"have reach the target {self.current_path.target_rack_id} "+f"at {datetime.now()}")
                                chanal.close()
                                
                                # set time of solving the task (load or unload target rack)
                                self.next_point_time = datetime.now() + timedelta(seconds=self.task.execution_time)
                                # and get next point (now Path iterator set to backward mode)
                                self.next_point = self.current_path.get_next_checkpoint()
                                self.path_direction = "back"
                            # but if it was back path, it means that forklift reach warehouse gate
                            elif self.path_direction == "back":
                                # set time to finish the task and a little rest
                                self.next_point_time = datetime.now() + timedelta(seconds=uniform(3, 5))
                                # and make next_point None, to reach next else condition next time
                                self.next_point = None
                    # if we reach this else condition then forklift finish the task
                    else:
                        print(
                            f"Forklift #{self.id} of warehouse #{self.warehouse_id} "
                            f"have finished the task #{self.task.id} "
                            f"at {datetime.now()}")
                        
                        chanal = pika.BlockingConnection(pika.ConnectionParameters(host = rabbit['host'], port = rabbit['port'],virtual_host = '/',credentials = pika.PlainCredentials('rmuser', 'rmpassword'))).channel()
                        
                        # json.dump({"warehouse_name": "#"+str(self.warehouse_id),"forklift_name": self.id,"point_name": str(self.current_point['check_point_name']),"timestamp": str(datetime.now().isoformat()),"target_point": str(self.current_path.target_rack_id)})
                        chanal.basic_publish(exchange=rabbit['exchange'],routing_key='finish_task',body=json.dumps({"warehouse_name": "#"+str(self.warehouse_id),"forklift_name": self.id,"point_name": str(self.current_point['check_point_name']),"timestamp": str(datetime.now().isoformat()),"target_point": str(self.current_path.target_rack_id)}))#f"Forklift #{self.id} of warehouse #{self.warehouse_id} "+f"have finished the task #{self.task.id} "+f"at {datetime.now()}")
                        chanal.close()
                        
                        # set task to finished state
                        self.task.finish()
                        # set forklift to chilling status. Next time we will give him a task
                        self.status = 'chill'
                        self.current_path = None
                        self.path_direction = None
                        self.current_point = None
                        self.next_point_time = None
            else:
                # if forklift have next_point_time but tima hasn't come - we need to wait more and check it next time
                pass
