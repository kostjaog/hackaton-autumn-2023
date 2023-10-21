import { Forklift } from "../interfaces/Forklifts";

export const getRusStatus = (forklift: Forklift) => {
  return forklift?.status === "WAITING_ORDER"
    ? "Ожидание заказа"
    : forklift?.status === "ENDING_ORDER"
    ? "Завершает заказ"
    : "Начал выполнение заказа";
};
