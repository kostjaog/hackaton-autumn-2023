import { Checkpoint } from "../../interfaces/Warehouse";

const Road: React.FC<Checkpoint> = ({ checkPointName }) => {
  return (
    <article className="road">
      <div className="road-line" />
      {checkPointName && (
        <div className="checkpoint">
          <p>{checkPointName}</p>
        </div>
      )}
    </article>
  );
};

export default Road;
