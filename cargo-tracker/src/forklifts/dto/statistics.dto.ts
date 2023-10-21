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

// travel_distance: 0,
//         orders_count: candidate.orders.length,
//         travel_time: [],
//         downtime: 0,
//         time_in_status: {
//           waiting: 0,
//           processing: 0,
//           enging: 0,
//         },
//       };