import { WareHouseElementProps } from "../../interfaces/Warehouse";
import Road from "./Road";

const Roads: React.FC<WareHouseElementProps> = ({ items }) => {
  return (
    <div className="roads">
      {items.map((name, index) => (
        <Road key={index} checkPointName={name} />
      ))}
    </div>
  );
};

export default Roads;
