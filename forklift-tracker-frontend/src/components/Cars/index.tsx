import { Forklift } from "../../interfaces/Forklifts";
import Car from "./Car";

const Cars = ({ items, onClick }: { items: Forklift[]; onClick: (item: Forklift) => void }) => {
  return (
    <div className="cars">
      {items.map((item, index) => (
        <Car key={index} onClick={() => onClick(item)} number={item.name} />
      ))}
    </div>
  );
};

export default Cars;
