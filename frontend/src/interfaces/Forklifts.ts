import { RackCheckPointName, RouteCheckPointName } from "../Types/Checkpoints";

export interface Forklift {
  id: string;
  name: string;
  warehouse_id: string;
  status: "PROCESSING_ORDER" | "WAITING_ORDER" | "ENDING_ORDER";
  last_tm_date: string;
  next_tm_date: string;
  average_speed: null | number;
  orders: {
    id: string;
    status: "PROCESSING";
    created_at: string;
    ended_at: null | string;
    forklift_name: string;
    warehouse_id: string;
    path_id: string;
    path: {
      id: string;
      target_name: RackCheckPointName;
    };
    check_points_time: {
      id: string;
      point_name: RouteCheckPointName;
      time: string;
      order_id: string;
    }[];
  }[];
}
