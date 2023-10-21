import RackImg from "../../assets/imgs/products.png";
import { RackProps } from "../../interfaces/Warehouse";

const Rack: React.FC<RackProps> = ({ checkPointName, isRoad }) => {
  return (
    <article className="rack">
      {isRoad ? (
        <div className="line" />
      ) : (
        <>
          <img src={RackImg} alt="" />
          {checkPointName && <p>{checkPointName}</p>}
        </>
      )}
    </article>
  );
};

export default Rack;
