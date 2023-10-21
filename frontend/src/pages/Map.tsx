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

      console.log(data);
    });
  }, []);

  return (
    <div>
      <YMaps>
        {warehouses && (
          <YaMap
            style={{ height: "80vh", width: "100%" }}
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
