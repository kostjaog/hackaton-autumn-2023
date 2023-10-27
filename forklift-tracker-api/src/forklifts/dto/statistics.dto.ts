export interface forklift_statistics_dto {
  travel_distance: number;
  orders_count: number;
  travel_time: {
    date: string;
    move_time: number;
  }[];
  downtime: number;
  time_in_status: {
    waiting: number;
    processing: number;
    ending: number;
  };
}
