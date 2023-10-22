import React from "react";
import Rack from "../components/Racks/Rack";
import Racks from "../components/Racks";
import Road from "../components/Roads/Road";
import { WareHouseData } from "../interfaces/Warehouse";
import Roads from "../components/Roads";
import Cars from "../components/Cars";
import Car from "../components/Cars/Car";

import { useAnimate } from "framer-motion";
import { POINTS_POSITIONS } from "../data/points";
import { Forklift, Order } from "../interfaces/Forklifts";
import { ROUTES } from "../data/routes";
import Modal from "../components/Modal";
import { formatDate } from "../utils/formatDate";
import Button from "../components/Button";

import { useLocation, useNavigate } from "react-router-dom";
import { getRusStatus } from "../utils/getRusStatus";
import AnimatedCar from "../components/Cars/AnimatedCar";
import { isVisible } from "@testing-library/user-event/dist/utils";

const WAREHOUSE_DATA: WareHouseData[] = [
  {
    type: "roads",
    items: [null, null, null, "K10", null, null, null, "K9", null, "K8"],
  },
  {
    type: "racks",
    items: [null, "X6", null, null, null, null, "X5", null, null, "isRoad"],
  },
  {
    type: "roads",
    items: [null, null, null, "K7", null, null, null, "K6", null, "K5"],
  },
  {
    type: "racks",
    items: [null, "X4", null, null, null, null, "X3", null, null, "isRoad"],
  },
  {
    type: "roads",
    items: [null, null, null, "K4", null, null, null, "K3", null, "K2"],
  },
  {
    type: "racks",
    items: [null, "X2", null, null, null, null, "X1", null, null, "isRoad"],
  },
];

const Warehouse = () => {
  const id = useLocation();

  const navigate = useNavigate();

  const [forklifts, setForklifts] = React.useState<Forklift[] | null>(null);
  const [forkliftsForModal, setForkLiftsFroModal] = React.useState<Forklift | null>(null);

  const interval = React.useRef<any>();

  React.useEffect(() => {
    const getData = () => {
      fetch(`http://81.31.244.133/api/warehouses/${id.pathname.replace("/warehouse/", "")}`).then(
        async (res) => {
          const data = await res.json();

          setForklifts(data.loaders);
        }
      );
    };

    getData();

    interval.current = setInterval(() => {
      getData();
    }, 1000);

    return () => clearInterval(interval.current);
  }, []);

  return (
    <section className="wrapper center">
      <section className="warehouse" style={{ marginTop: 40 }}>
        {WAREHOUSE_DATA.map((element, index) =>
          element.type === "racks" ? (
            <Racks key={index} items={element.items} />
          ) : (
            <Roads key={index} items={element.items} />
          )
        )}
        <div className="start">
          <Cars
            onClick={(item) => setForkLiftsFroModal(item)}
            items={
              forklifts?.filter(
                (item) =>
                  item.status === "WAITING_ORDER" ||
                  (item.orders.slice(-1)[0].check_points_time.length > 2 &&
                    item.orders.slice(-1)[0].check_points_time.slice(-1)[0].point_name === "K1")
              ) ?? []
            }
          />
          <div className="start-line">
            <Road checkPointName={"K1"} />
          </div>
        </div>
        <div className="active-drive-car-wrapper">
          <div className="active-cars-container">
            {forklifts?.map((forklift, index) => {
              return (
                <AnimatedCar
                  key={index}
                  forklift={forklift}
                  index={index}
                  setForkLiftsFroModal={setForkLiftsFroModal}
                />
              );
            })}
          </div>
        </div>
      </section>
      <div style={{ alignSelf: "stretch", padding: "15px 0" }}>
        <div
          style={{
            alignSelf: "stretch",
            display: "flex",
            flex: 1,
            justifyContent: "space-around",
            alignItems: "center",
            padding: "20px 20px",
            backgroundColor: "#e5e5e5",
            marginBottom: 10,
            borderRadius: 10,
          }}>
          <p style={{ textAlign: "center", flex: 1.5, fontWeight: 700 }}>ID</p>
          <p style={{ textAlign: "center", flex: 1, fontWeight: 700 }}>Название погрузчика</p>
          <p style={{ textAlign: "center", flex: 1, fontWeight: 700 }}>Кол-во заказов</p>
          <p style={{ textAlign: "center", flex: 1, fontWeight: 700 }}>Текущий статус</p>
        </div>
        {forklifts?.map((item, index) => (
          <div
            key={index}
            onClick={() => setForkLiftsFroModal(item)}
            style={{
              cursor: "pointer",
              alignSelf: "stretch",
              display: "flex",
              flex: 1,
              justifyContent: "space-around",
              alignItems: "center",
              padding: "20px 20px",
              backgroundColor: "#f4f4f4",
              marginBottom: 10,
              borderRadius: 10,
            }}>
            <p style={{ textAlign: "center", flex: 1.5, whiteSpace: "nowrap" }}>{item.id}</p>
            <p style={{ textAlign: "center", flex: 1 }}>{item.name}</p>
            <p style={{ textAlign: "center", flex: 1 }}>{item.orders.length}</p>
            <p style={{ textAlign: "center", flex: 1 }}>{getRusStatus(item)}</p>
          </div>
        ))}
      </div>
      <Modal closeModal={() => setForkLiftsFroModal(null)} isVisible={forkliftsForModal !== null}>
        {forkliftsForModal && (
          <>
            <div className="forklift-modal-content">
              <h2>Погрузчик {forkliftsForModal?.name}</h2>
              <div className="row">
                <p>Статус</p>
                <span>{getRusStatus(forkliftsForModal)}</span>
              </div>
              <div className="row">
                <p>Номер заказа</p>
                <b>{forkliftsForModal?.orders?.[0]?.id ?? "Заказы отсутствуют"}</b>
              </div>
              <div className="row">
                <p>Дата последнего ТО</p>
                <b>{formatDate(forkliftsForModal?.last_tm_date as string)}</b>
              </div>
              <div className="row">
                <p>Дата следующего ТО</p>
                <b>{formatDate(forkliftsForModal?.next_tm_date as string)}</b>
              </div>
            </div>
            <div className="row">
              <Button onClick={() => navigate(`/report/${forkliftsForModal?.id}`)}>Отчёт</Button>
            </div>
          </>
        )}
      </Modal>
    </section>
  );
};

export default Warehouse;
