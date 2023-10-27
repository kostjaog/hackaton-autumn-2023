export interface WareHouseElementProps {
  items: (null | string)[];
}

export interface RackProps extends Checkpoint {
  isRoad?: boolean;
}

export interface Checkpoint {
  checkPointName: string | null;
}

export interface WareHouseData {
  type: "racks" | "roads";
  items: (null | string | "isRoad")[];
}
