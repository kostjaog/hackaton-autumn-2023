from Warehouse import Warehouse
import multiprocessing
from pathos.multiprocessing import ProcessPool
from config import cities
from random import randint


def run_warehouse(w: Warehouse):
    """
    Just run work() method of Warehouse class.
    Need it for multiprocessing parallel run of a few warehouses
    :param w: instance of warehouse class
    :return: Nothing
    """
    w.work()



if __name__ == '__main__':
    # list to store all processes
    print("press any key to start")
    input()
    processes = []
    # list to store all warehouses
    warehouses = []
    # parallel all tasks by approx 80% of CPUs
    for i in range(1):#int(multiprocessing.cpu_count() * 0.2)):
        # create new warehouse with random city from cities list
        warehouses.append(Warehouse(warehouse_id=i, city=cities[randint(0, len(cities) - 1)]))
    # here we use ProcessPool from pathos lib.
    # The reason why we don't use standard multiprocessing lib is because it does not support classes pickling
    pool = ProcessPool(nodes=int(multiprocessing.cpu_count() * 0.2))  # we use 80% of cores
    pool.map(run_warehouse, warehouses)

    # pool.terminate()
    # # wait a moment for all worker processes to stop
    # pool.join()


    # wh = Warehouse(warehouse_id=0, city=cities[randint(0, len(cities) - 1)])
    # run_warehouse(wh)
