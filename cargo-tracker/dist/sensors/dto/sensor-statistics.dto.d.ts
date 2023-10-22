export interface sensor_statistics_dto {
    step_through_count: number;
    forklift_steps_count: {
        forklift_name: number;
        step_through_count: number;
    }[];
}
