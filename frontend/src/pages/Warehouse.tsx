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
import { Forklift } from "../interfaces/Forklifts";
import { ROUTES } from "../data/routes";
import Modal from "../components/Modal";
import { formatDate } from "../utils/formatDate";
import Button from "../components/Button";

import { useLocation, useNavigate } from "react-router-dom";
import { getRusStatus } from "../utils/getRusStatus";

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

const getCurrentForkliftRoute = (forklift: Forklift) => {
  const points = forklift.orders[0].check_points_time;

  console.log("POINTS", points);

  if (points.length === 0) {
    return POINTS_POSITIONS[0];
  }

  const lastPoint = points[points.length - 1];

  return POINTS_POSITIONS.find((item) => item.checkPointName === lastPoint.point_name);
};

const checkOnWaiting = (forklift: Forklift) => {
  return (
    forklift.orders[0].check_points_time.filter(
      (point) =>
        point.point_name ===
        ROUTES.find((route) => route.target === forklift.orders[0].path.target_name)?.routes.slice(
          -1
        )[0].pointName
    ).length === 1
  );
};

const checkIsBack = (forklift: Forklift) => {
  return (
    forklift.orders[0].check_points_time.filter(
      (point) =>
        point.point_name ===
        ROUTES.find((route) => route.target === forklift.orders[0].path.target_name)?.routes.slice(
          -1
        )[0].pointName
    ).length === 2
  );
};

const Warehouse = () => {
  const [scope, animate] = useAnimate();

  const id = useLocation();

  const navigate = useNavigate();

  const [forklifts, setForklifts] = React.useState<Forklift[] | null>(null);
  const [forkliftsForModal, setForkLiftsFroModal] = React.useState<Forklift | null>(null);
  const [currentRoute, setCurrentRoute] = React.useState();

  const interval = React.useRef<any>();

  React.useEffect(() => {
    const getData = () => {
      fetch(`http://81.31.244.133/api/warehouses/${id.pathname.replace("/warehouse/", "")}`).then(
        async (res) => {
          const data = await res.json();

          console.log(data);
          setForklifts(data.loaders);
        }
      );
    };

    getData();

    interval.current = setInterval(() => {
      getData();
    }, 1000);

    return clearInterval(interval.current);
  }, []);

  React.useEffect(() => {
    if (forklifts) {
      forklifts
        .filter((item) => item.status === "PROCESSING_ORDER" || item.status === "ENDING_ORDER")
        .map((item, index) => {
          if (item.orders.length > 0) {
            const pointsLength = item.orders[0].check_points_time.length;
            const targetPoint = item.orders[0].path.target_name;
            const currentRoute = ROUTES.find((item) => item.target === targetPoint);
            const lastPoint = getCurrentForkliftRoute(item);

            const currentPoint =
              pointsLength === 0
                ? (currentRoute?.routes[0].pointName as string)
                : item.orders[0].check_points_time?.slice(-1)?.[0].point_name;

            const findedIndex = currentRoute!.routes.findIndex(
              (item) => item.pointName === lastPoint?.checkPointName
            );

            console.log(findedIndex);

            let isBack = false;
            let nextPoint = null;
            let nextPointCoords = null;
            let isWaiting = false;
            let isFinish = false;

            if (item.orders[0].check_points_time.length < currentRoute!.routes.length) {
              nextPoint = currentRoute?.routes[findedIndex + 1];
            } else if (item.orders[0].check_points_time.length === currentRoute!.routes.length) {
              isWaiting = true;
            } else {
              if (findedIndex === 0) {
                isFinish = true;
              } else {
                nextPoint = currentRoute?.routes[findedIndex - 1];
              }
              isBack = true;
            }

            if (isFinish) {
              console.log("IS FINISH");
              return;
            }

            if (isBack) {
              const coords = POINTS_POSITIONS.find(
                (item) => item.checkPointName === currentRoute?.routes[findedIndex - 1].pointName
              )?.coords;
              if (
                (["K5", "K8", "K2"].includes(nextPoint!.pointName) &&
                  ["K9", "K6", "K3"].includes(currentPoint)) ||
                (["K10", "K7", "K4"].includes(currentPoint) &&
                  ["K9", "K6", "K3"].includes(nextPoint!.pointName))
              ) {
                console.log("COORDS", coords);

                animate(
                  `.active-car-${index + 1}`,
                  {
                    transform: "translate(80%, 40%) rotate(90deg)",
                  },
                  {
                    duration: 1,
                    onComplete: () =>
                      setTimeout(() => {
                        animate(
                          `.active-car-${index + 1}`,
                          {
                            // transform: "translate(80%, 40%) rotate(90deg)",
                            right: `${coords?.x}px`,
                            bottom: `${coords?.y}px`,
                          },
                          {
                            duration: 7,
                          }
                        );
                      }, 200),
                  }
                );
              }

              if (
                ["K8", "K5", "K2"].includes(currentPoint) &&
                ["K5", "K2", "K1"].includes(nextPoint!.pointName)
              ) {
                animate(
                  `.active-car-${index + 1}`,
                  {
                    transform: "translate(40%, 80%) rotate(180deg)",
                  },
                  {
                    duration: 1,
                    onComplete: () =>
                      setTimeout(() => {
                        animate(
                          `.active-car-${index + 1}`,
                          {
                            // transform: "translate(80%, 40%) rotate(90deg)",
                            right: `${coords?.x}px`,
                            bottom: `${coords?.y}px`,
                          },
                          {
                            duration: 5.5,
                          }
                        );
                      }, 200),
                  }
                );
              }
            } else if (isWaiting) {
              animate(
                `.active-car-${index + 1}`,
                {
                  transform: "translate(34%, 80%) rotate(-180deg)",
                },
                {
                  duration: 1,
                }
              );
            } else {
              const coords = POINTS_POSITIONS.find(
                (item) => item.checkPointName === currentRoute?.routes[findedIndex + 1].pointName
              )?.coords;
              if (
                (["K9", "K6", "K3"].includes(nextPoint!.pointName) &&
                  ["K5", "K8", "K2"].includes(currentPoint)) ||
                (["K9", "K6", "K3"].includes(currentPoint) &&
                  ["K10", "K7", "K4"].includes(nextPoint!.pointName))
              ) {
                animate(
                  `.active-car-${index + 1}`,
                  {
                    transform: "translate(0, 40%) rotate(-90deg)",
                  },
                  {
                    duration: 1,
                    onComplete: () =>
                      setTimeout(() => {
                        animate(
                          `.active-car-${index + 1}`,
                          {
                            // transform: "translate(80%, 40%) rotate(90deg)",
                            right: `${coords?.x}px`,
                            bottom: `${coords?.y}px`,
                          },
                          {
                            duration: 7,
                          }
                        );
                      }, 200),
                  }
                );
              }

              if (
                ["K5", "K2", "K1"].includes(currentPoint) &&
                ["K8", "K5", "K2"].includes(nextPoint!.pointName)
              ) {
                animate(
                  `.active-car-${index + 1}`,
                  {
                    // transform: "translate(80%, 40%) rotate(90deg)",
                    right: `${coords?.x}px`,
                    bottom: `${coords?.y}px`,
                  },
                  {
                    duration: 5.5,
                  }
                );
              }
            }
          }
        });
    }
  }, [forklifts]);

  // React.useEffect(() => {
  //   animate(
  //     ".active-car-1",
  //     { right: activePoint.coords.x, bottom: activePoint.coords.y },
  //     {
  //       duration: 10,
  //     }
  //   );

  //   setTimeout(() => {
  //     animate(
  //       ".active-car-1",
  //       { right: activePoint.coords.x, bottom: activePoint.coords.y },
  //       { duration: 1 }
  //     );
  //   }, 2000);
  // }, [activePoint]);

  return (
    <section className="wrapper center">
      <section className="warehouse">
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
            items={forklifts?.filter((item) => item.status === "WAITING_ORDER") ?? []}
          />
          <div className="start-line">
            <Road checkPointName={"K1"} />
          </div>
        </div>
        <div className="active-drive-car-wrapper">
          {POINTS_POSITIONS.map((item, index) => (
            <div
              key={index}
              style={{
                height: 10,
                width: 10,
                position: "absolute",
                bottom: item.coords.y + "px",
                right: item.coords.x + "px",
                zIndex: 5,
              }}
            />
          ))}
          <div ref={scope} className="active-cars-container">
            {forklifts
              ?.filter(
                (item) => item.status === "PROCESSING_ORDER" || item.status === "ENDING_ORDER"
              )
              .map((forklift, index) => (
                <div
                  // onClick={() => setForkLiftsFroModal(forklift)}
                  key={index}
                  className={`active-car-${index + 1}`}
                  style={{
                    transform: "translate(40%, -40%) rotate(0deg)",
                    position: "absolute",
                    right: getCurrentForkliftRoute(forklift)?.coords.x,
                    bottom: getCurrentForkliftRoute(forklift)?.coords.y,
                    zIndex: 5,
                  }}>
                  <Car
                    onClick={() => setForkLiftsFroModal(forklift)}
                    isWaiting={checkOnWaiting(forklift)}
                    isBack={checkIsBack(forklift)}
                    number={forklift.name}
                  />
                </div>
              ))}
          </div>
        </div>
      </section>
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
