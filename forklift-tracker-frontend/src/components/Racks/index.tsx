import { WareHouseElementProps } from "../../interfaces/Warehouse";
import Rack from "./Rack";

const Racks: React.FC<WareHouseElementProps> = ({ items }) => {
  return (
    <div className="racks">
      {items.map((name, index) => (
        <Rack key={index} checkPointName={name} isRoad={name === "isRoad"} />
      ))}
    </div>
  );
};

export default Racks;
