export interface rmq_order_dto {
  warehouse_name: string;
  forklift_name: number;
  point_name: string;
  timestamp: Date;
  target_point: string;
}
