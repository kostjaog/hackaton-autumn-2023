import React from "react";
import { useLocation } from "react-router-dom";
import { Forklift, Order } from "../interfaces/Forklifts";
import { getOrderRusStatus, getRusStatus } from "../utils/getRusStatus";
import { FadeLoader } from "react-spinners";
import { formatDate } from "../utils/formatDate";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Calendar from "react-calendar";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { toast } from "react-toastify";

ChartJS.register(ArcElement, Tooltip, Legend);

const ForkliftReport = () => {
  const location = useLocation();

  const id = location.pathname.replace("/report/", "");
  const [item, setItem] = React.useState<Forklift | null>(null);

  const [reportModalIsVisible, setReportModalIsVisible] = React.useState(false);

  const [startDate, setStartDate] = React.useState<any>(null);
  const [calendarIsVisible, setCalendarIsVisible] = React.useState(false);

  const calendarRef = React.useRef();

  const [statistics, setStatistics] = React.useState<{
    "travel_distance": number;
    "orders_count": number;
    "travel_time": {
      "date": string;
      "move_time": number;
    }[];
    "downtime": number;
    "time_in_status": {
      "waiting": number;
      "processing": number;
      "ending": number;
    };
  } | null>(null);

  // React.useEffect(() => console.log(startDate), [startDate]);

  React.useEffect(() => {
    fetch(`http://81.31.244.133/api/forklifts/${id}`).then(async (res) => {
      const data = await res.json();
      // console.log(data);
      if (res.status === 200) {
        setItem(data);
      }
    });
  }, []);

  React.useEffect(() => {
    if (startDate) {
      getStatistics(startDate);
    }
  }, [startDate]);

  const getStatistics = (order: Order) => {
    setStartDate(null);
    fetch(
      `http://81.31.244.133/api/forklifts/statistics/${
        item?.id
      }/${startDate[0].toISOString()}/${startDate[1].toISOString()}`
    ).then(async (res) => {
      const data = await res.json();

      if (res.status === 200) {
        setStatistics(data);
        setTimeout(() => {
          window.scrollTo(0, document.body.scrollHeight);
        }, 200);
      } else {
        const notify = () =>
          toast("Ошибка! В данный период выполненные заказыв отсутствуют", {
            type: "error",
            style: {
              fontSize: "12px",
              fontFamily: "Montserrat, sans-serif",
            },
          });
        notify();
      }
    });
  };

  return (
    <section className="wrapper">
      {item === null ? (
        <div style={{ display: "flex", justifyContent: "center", paddingTop: 100 }}>
          <FadeLoader color="orange" />
        </div>
      ) : (
        <>
          <div className="forklift-report">
            <div className="container">
              <div className="block">
                <h1>Данные погрузчика</h1>
                <RowInfo label="ID" value={item.id} />
                <RowInfo label="Название" value={item.name} />
                <RowInfo label="Статус" value={getRusStatus(item)} />
                <RowInfo label="Дата последнего ТО" value={formatDate(item.last_tm_date)} />
                <RowInfo label="Дата следующего ТО" value={formatDate(item.next_tm_date)} />
              </div>
              <div className="block" style={{ flex: 2 }}>
                <h1>Данные о заказах</h1>
                {item.orders.length > 0 ? (
                  <div style={{ maxHeight: 500, overflowY: "scroll" }}>
                    {item.orders.map((order, index) => (
                      <OrderCard
                        openModal={() => {
                          getStatistics(order);
                          setReportModalIsVisible(true);
                        }}
                        index={index}
                        key={index}
                        order={order}
                      />
                    ))}
                  </div>
                ) : (
                  <div
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                      height: "100%",
                      paddingBottom: 100,
                    }}>
                    <p>Заказов не найдено</p>
                  </div>
                )}
              </div>
            </div>
            <div className="block" style={{ marginTop: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h1>Статистика</h1>
                <div style={{ position: "relative" }}>
                  {item.orders.some((order) => order.status === "DONE") && (
                    <Button onClick={() => setCalendarIsVisible(true)}>Выбрать дату</Button>
                  )}
                  {calendarIsVisible && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: "100%",
                        right: 0,
                        transform: "translateY(50px)",
                      }}>
                      <Calendar
                        selectRange={true}
                        onChange={(value) => {
                          setStartDate(value);
                          setCalendarIsVisible(false);
                        }}
                        value={startDate}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div>
                {item.orders.some((order) => order.status === "DONE") ? (
                  <div>
                    {statistics ? (
                      <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
                        <div style={{ display: "flex", gap: 20, marginTop: 30 }}>
                          <div
                            style={{
                              background: "#e4e4e4",
                              borderRadius: 10,
                              padding: "15px",
                              flex: 1,
                              fontSize: 12,
                              textAlign: "center",
                            }}>
                            Нерабочее время:
                            <h1 style={{ marginBottom: 0, marginTop: 10 }}>
                              {(statistics.downtime / 1000 / 60).toFixed(1)} минут
                            </h1>
                          </div>
                          <div
                            style={{
                              background: "#e4e4e4",
                              borderRadius: 10,
                              padding: "15px",
                              flex: 1,
                              fontSize: 12,
                              textAlign: "center",
                            }}>
                            Пройденая дистанция:
                            <h1 style={{ marginBottom: 0, marginTop: 10 }}>
                              {statistics.travel_distance} метров
                            </h1>
                          </div>
                          <div
                            style={{
                              background: "#e4e4e4",
                              borderRadius: 10,
                              padding: "15px",
                              flex: 1,
                              fontSize: 12,
                              textAlign: "center",
                            }}>
                            Количество выполненных заказов:
                            <h1 style={{ marginBottom: 0, marginTop: 10 }}>
                              {statistics.orders_count} шт.
                            </h1>
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: 20 }}>
                          <div
                            style={{
                              marginTop: 10,
                              background: "#cbcbff",
                              borderRadius: 10,
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 12,
                              padding: "15px 15px",
                              flex: 1,
                              textAlign: "center",
                            }}>
                            Проведено времени в статусе ожидания заказа
                            <h1
                              style={{
                                fontWeight: 600,
                                fontSize: 20,
                                marginTop: 10,
                                marginBottom: 0,
                              }}>
                              {Math.abs(statistics?.time_in_status.waiting / 1000 / 60).toFixed(1)}{" "}
                              минут
                            </h1>
                          </div>
                          <div
                            style={{
                              marginTop: 10,
                              background: "#cbffd0",
                              borderRadius: 10,
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 12,
                              padding: "15px 15px",
                              flex: 1,
                              textAlign: "center",
                            }}>
                            Проведено времени в статусе выполнения заказа
                            <h1
                              style={{
                                fontWeight: 600,
                                fontSize: 20,
                                marginTop: 10,
                                marginBottom: 0,
                              }}>
                              {Math.abs(statistics?.time_in_status.processing / 1000 / 60).toFixed(
                                1
                              )}{" "}
                              минут
                            </h1>
                          </div>
                          <div
                            style={{
                              marginTop: 10,
                              background: "#ffcbcb",
                              borderRadius: 10,
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 12,
                              padding: "15px 15px",
                              flex: 1,
                              textAlign: "center",
                            }}>
                            Проведено времени в статусе завершения заказа
                            <h1
                              style={{
                                fontWeight: 600,
                                fontSize: 20,
                                marginTop: 10,
                                marginBottom: 0,
                              }}>
                              {Math.abs(statistics?.time_in_status.ending / 10000 / 60).toFixed(1)}{" "}
                              минут
                            </h1>
                          </div>
                        </div>
                        <div
                          style={{
                            width: 400,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            marginTop: 30,
                            alignSelf: "center",
                          }}>
                          <h1>Статистика по дням</h1>
                          <Pie
                            options={{}}
                            data={{
                              labels: statistics?.travel_time.map((item) =>
                                Math.abs(item.move_time / 1000 / 60).toFixed(2)
                              ),
                              datasets: [
                                {
                                  label: "Статистика по дням (минуты)",
                                  data: statistics?.travel_time.map((item) =>
                                    Math.abs(item.move_time / 1000 / 60).toFixed(2)
                                  ),
                                  backgroundColor: statistics?.travel_time.map(
                                    (_) =>
                                      "#" +
                                      ((Math.random() * 0xffffff) << 0)
                                        .toString(16)
                                        .padStart(6, "0") +
                                      40
                                  ),
                                },
                              ],
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div>Выберите дату</div>
                    )}{" "}
                    {/* {["Количество заказов", "Пройденная дистанция", ""]} */}
                  </div>
                ) : (
                  <p>Нет выполненных заказов</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
      <Modal isVisible={reportModalIsVisible} closeModal={() => setReportModalIsVisible(false)}>
        <div>
          <h1>Отчёт </h1>
        </div>
      </Modal>
    </section>
  );
};

const RowInfo = ({ label, value }: { label: string; value: string }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 20,
        paddingBottom: 20,
        borderBottom: "1px solid #fdc06440",
      }}>
      <p>{label}</p>
      <b style={{ textAlign: "end" }}>{value}</b>
    </div>
  );
};

const OrderCard = ({
  order,
  index,
  openModal,
}: {
  order: Order;
  index: number;
  openModal: () => void;
}) => {
  return (
    <div
      style={{
        borderBottom: "1px solid lightgray",
        paddingBottom: 15,
        marginBottom: 15,
        border: "1px solid lightGray",
        padding: 15,
        borderRadius: 10,
      }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ marginBottom: 10 }}>История перемещений</p>
        <p>
          Контрольная точка: <b>{order.path.target_name}</b>
        </p>
      </div>
      <div style={{ display: "flex" }}>
        {order.check_points_time.map((item, index) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <p
              style={{
                padding: 10,
                backgroundColor: "lightgray",
                borderRadius: 10,
                fontWeight: 600,
              }}>
              {item.point_name}
            </p>
            <p style={{ padding: "0 5px" }}>
              {index !== order.check_points_time.length - 1 ? " > " : null}
            </p>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", marginTop: 10, justifyContent: "space-between" }}>
        <p>Статус</p>
        <b>{getOrderRusStatus(order)}</b>
      </div>
      <div style={{ display: "flex", marginTop: 10, justifyContent: "space-between" }}>
        <p>Создан</p>
        <b>{formatDate(order.created_at)}</b>
      </div>
      <div style={{ display: "flex", marginTop: 10, justifyContent: "space-between" }}>
        <p>Выполнен</p>
        <b>{order.status === "DONE" ? formatDate(order.ended_at as string) : "Выполняется"}</b>
      </div>
    </div>
  );
};

export default ForkliftReport;
