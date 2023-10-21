import { Forklift, Order } from "../interfaces/Forklifts";

export const getRusStatus = (forklift: Forklift) => {
  return forklift?.status === "WAITING_ORDER"
    ? "Ожидание заказа"
    : forklift?.status === "ENDING_ORDER"
    ? "Завершает заказ"
    : "Начал выполнение заказа";
};

export const getOrderRusStatus = (order: Order) => {
  return order.status === "PROCESSING"
    ? "В процессе выполнения"
    : order.status === "CREATED"
    ? "Создан"
    : "Выпонен";
};
