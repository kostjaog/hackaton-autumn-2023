import React from "react";
import { useLocation } from "react-router-dom";
import { Forklift } from "../interfaces/Forklifts";
import { getRusStatus } from "../utils/getRusStatus";
import { FadeLoader } from "react-spinners";

const ForkliftReport = () => {
  const location = useLocation();

  const id = location.pathname.replace("/report/", "");
  const [item, setItem] = React.useState<Forklift | null>(null);

  React.useEffect(() => {
    fetch(`http://81.31.244.133/api/forklifts/${id}`).then(async (res) => {
      const data = await res.json();
      console.log(data);
      setItem(data);
    });
  }, []);

  return (
    <section className="wrapper">
      {item === null ? (
        <div style={{ display: "flex", justifyContent: "center", paddingTop: 100 }}>
          <FadeLoader color="orange" />
        </div>
      ) : (
        <div className="forklift-report">
          <div className="block">
            <h1>Данные погрузчика</h1>
            {123}
          </div>
          <div className="block">
            <h1>Данные о заказах</h1>
            <div>
              <p>Статус</p>
              <p>{123}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ForkliftReport;
