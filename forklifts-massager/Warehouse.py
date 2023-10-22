from Task import TaskQueue
from random import randint
from Forklift import Forklift
from config import rabbit,cords
import time
import requests



class Warehouse:
    """
    Warehouse class.
    It represents works of onw warehouse in given city
    """

    def __init__(
            self,
            warehouse_id: int,
            city: str
    ):
        # self.chanal = pika.BlockingConnection(pika.ConnectionParameters(host = rabbit['host'], port = rabbit['port'],virtual_host = '/',credentials = pika.PlainCredentials('rmuser', 'rmpassword'))).channel()
        self.id = warehouse_id
        self.city = city
        self.task_queue = TaskQueue(self.id)  # queue for all task of this warehouse instance
        self.forklift_park = []  # list of all forklifts belongs to this warehouse instance
        self.forklift_count = 0  # just counter to know next forklift id
        if(warehouse_id<len(cords)):
            payload = {
                        "coordX": str(cords[warehouse_id][0]),
                        "coordY": str(cords[warehouse_id][1]),
                        "name": "#"+str(warehouse_id)}
        else:
            payload = {
                        "coordX": str(cords[0][0]),
                        "coordY": str(cords[0][1]),
                        "name": "#"+str(warehouse_id)}

        r = requests.post('http://kostjaog.ru/api/warehouses', data=payload)
        # init random number of workers
        for _ in range(6):#randint(6, 15)):
            self.add_new_forklift()

        # init basic queue with random number of tasks, depends on forklifts number
        for _ in range(randint(self.forklift_count * 2, self.forklift_count * 4)):
            self.task_queue.create_new_task()

    def add_new_forklift(self):
        # create new forklift with next id from forklift_count
        # with current warehouse id
        # and it's tasks queue
        self.forklift_park.append(
            Forklift(
                forklift_id=self.forklift_count,
                warehouse_id=self.id,
                task_queue=self.task_queue
            )
        )
        
        self.forklift_count += 1

    def work(self):
        #ПОЖАЛУЙСТА НЕ ТАК БЫСТРО !!!!
        # time.sleep(randint(4,10))
        # infinite loop with warehouse works
        while True:
            # iterate over forklifts and make them work =)
            for forklift in self.forklift_park:
                forklift.work()
            # and sometimes add new tasks to queue
            if(self.task_queue.queue.qsize()<42):
                for _ in range(randint(0, self.forklift_count)):
                    self.task_queue.create_new_task()

    def work_by_number(self,num):
        for i in range(num):
            for forklift in self.forklift_park:
                forklift.work()
            # and sometimes add new tasks to queue
            if(self.task_queue.queue.qsize()<42):
                for _ in range(randint(0, self.forklift_count)):
                    self.task_queue.create_new_task()
