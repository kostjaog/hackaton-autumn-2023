import { YMaps, Map as YaMap, Placemark } from "@pbe/react-yandex-maps";
import React from "react";
import { useNavigate } from "react-router-dom";

import WareHouseImg from "../assets/imgs/warehouse.png";

const Map = () => {
  const [warehouses, setWarehouses] = React.useState<
    | {
        coordX: "47.234852";
        coordY: "47.234852";
        id: string;
        name: "#0";
      }[]
    | null
  >(null);

  const navigate = useNavigate();

  React.useEffect(() => {
    fetch("http://kostjaog.ru/api/warehouses").then(async (res) => {
      const data = await res.json();

      setWarehouses(data);

      // console.log(data);
    });
  }, []);

  return (
    <div>
      <YMaps>
        <div
          style={{
            height: 500,
            width: 350,
            background: "#fff",
            position: "absolute",
            left: 40,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 900,
            borderRadius: 20,
            boxShadow: "0 0 10px #00000020",
            display: "flex",
            flexDirection: "column",
          }}>
          {warehouses?.map((item) => (
            <div
              onClick={() => navigate(`/warehouse/${item.id}`)}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "5px 15px",
                cursor: "pointer",
                borderBottom: "1px solid lightGray",
              }}>
              Название склада: {item.name}
              <img src={WareHouseImg} style={{ width: 50, marginRight: 10 }} />
            </div>
          ))}
        </div>
        {warehouses && (
          <YaMap
            style={{ height: "calc(100vh - 56px)", width: "100%" }}
            defaultState={{ center: [+warehouses[1].coordY, +warehouses[0].coordX], zoom: 14 }}>
            {warehouses.map((item) => (
              <Placemark
                onClick={() => {
                  navigate(`/warehouse/${item.id}`);
                }}
                geometry={[item.coordX, item.coordY]}
              />
            ))}
          </YaMap>
        )}
      </YMaps>
    </div>
  );
};

export default Map;
