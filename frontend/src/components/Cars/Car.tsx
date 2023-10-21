import CarImg from "../../assets/imgs/car.png";
import BackCarImg from "../../assets/imgs/car_with_product.png";
import { Forklift } from "../../interfaces/Forklifts";

const Car = ({
  number,
  isBack,
  isWaiting,
  onClick,
}: {
  number?: string;
  isBack?: boolean;
  isWaiting?: boolean;
  onClick: () => void;
}) => {
  return (
    <div className="car" onClick={() => onClick()}>
      <p className="car-number">{number}</p>
      <img src={isBack ? BackCarImg : CarImg} alt="" />
      {isWaiting && <div className="blob"></div>}
    </div>
  );
};

export default Car;
