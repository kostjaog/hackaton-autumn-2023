from typing import Union
from fastapi import FastAPI, Body, status
from Warehouse import Warehouse
import multiprocessing
from pathos.multiprocessing import ProcessPool
from config import cities
from random import randint

app = FastAPI()

def run_warhouse(w: Warehouse):
    w.work_by_number(6000)

@app.post("/generate")
def generate_activ():
    processes = []
    # list to store all warehouses
    warehouses = []
    # parallel all tasks by approx 80% of CPUs
    for i in range(int(multiprocessing.cpu_count() * 0.2)):
        # create new warehouse with random city from cities list
        warehouses.append(Warehouse(warehouse_id=i, city=cities[randint(0, len(cities) - 1)]))
    # here we use ProcessPool from pathos lib.
    # The reason why we don't use standard multiprocessing lib is because it does not support classes pickling
    pool = ProcessPool(nodes=int(multiprocessing.cpu_count() * 0.2))  # we use 80% of cores
    pool.map(run_warhouse, warehouses)

    return 0