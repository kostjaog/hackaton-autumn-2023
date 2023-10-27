import { RackCheckPointName, RouteCheckPointName } from "../Types/Checkpoints";

export const ROUTES: {
  target: RackCheckPointName;
  routes: { pointName: RouteCheckPointName; distance: number }[];
}[] = [
  {
    "target": "X1",
    "routes": [
      {
        "pointName": "K1",
        "distance": 5,
      },
      {
        "pointName": "K2",
        "distance": 10,
      },
      {
        "pointName": "K3",
        "distance": 10,
      },
    ],
  },
  {
    "target": "X2",
    "routes": [
      {
        "pointName": "K1",
        "distance": 5,
      },
      {
        "pointName": "K2",
        "distance": 10,
      },
      {
        "pointName": "K3",
        "distance": 15,
      },
      {
        "pointName": "K4",
        "distance": 10,
      },
    ],
  },
  {
    "target": "X3",
    "routes": [
      {
        "pointName": "K1",
        "distance": 5,
      },
      {
        "pointName": "K2",
        "distance": 5,
      },
      {
        "pointName": "K5",
        "distance": 10,
      },
      {
        "pointName": "K6",
        "distance": 10,
      },
    ],
  },
  {
    "target": "X4",
    "routes": [
      {
        "pointName": "K1",
        "distance": 5,
      },
      {
        "pointName": "K2",
        "distance": 5,
      },
      {
        "pointName": "K5",
        "distance": 10,
      },
      {
        "pointName": "K6",
        "distance": 15,
      },
      {
        "pointName": "K7",
        "distance": 10,
      },
    ],
  },
  {
    "target": "X5",
    "routes": [
      {
        "pointName": "K1",
        "distance": 5,
      },
      {
        "pointName": "K2",
        "distance": 5,
      },
      {
        "pointName": "K5",
        "distance": 5,
      },
      {
        "pointName": "K8",
        "distance": 10,
      },
      {
        "pointName": "K9",
        "distance": 5,
      },
    ],
  },
  {
    "target": "X6",
    "routes": [
      {
        "pointName": "K1",
        "distance": 5,
      },
      {
        "pointName": "K2",
        "distance": 5,
      },
      {
        "pointName": "K5",
        "distance": 5,
      },
      {
        "pointName": "K8",
        "distance": 10,
      },
      {
        "pointName": "K9",
        "distance": 15,
      },
      {
        "pointName": "K10",
        "distance": 10,
      },
    ],
  },
];
