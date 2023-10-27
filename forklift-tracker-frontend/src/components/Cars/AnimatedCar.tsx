import React from "react";
import { useAnimate } from "framer-motion";
import { Forklift } from "../../interfaces/Forklifts";
import { POINTS_POSITIONS } from "../../data/points";
import { ROUTES } from "../../data/routes";
import Car from "./Car";
import { RackCheckPointName, RouteCheckPointName } from "../../Types/Checkpoints";

interface AnimatedCarProps {
  index: number;
  forklift: Forklift;
  setForkLiftsFroModal: (item: Forklift) => void;
}

interface AnimatedData {
  currentPoint: string;
  findedIndex: number;
  nextPoint: null | {
    pointName: string;
    distance: number;
  };
  finishPoint: RouteCheckPointName | undefined;
  currentRoute:
    | {
        target: RackCheckPointName;
        routes: {
          pointName: RouteCheckPointName;
          distance: number;
        }[];
      }
    | undefined
    | undefined;
  status: "PROCESSING_ORDER" | "WAITING_ORDER" | "ENDING_ORDER";
}

const AnimatedCar: React.FC<AnimatedCarProps> = ({ forklift, setForkLiftsFroModal }) => {
  const [scope, animate] = useAnimate();

  const [isAnimated, setIsAnimated] = React.useState(false);
  const [dataForAnimate, setDataForAnimate] = React.useState<null | AnimatedData>(null);
  const [isWaiting, setIsWaiting] = React.useState(false);

  React.useEffect(() => {
    animate(
      scope.current,
      {
        transform: "translate(34%, 80%) rotate(180deg)",

      },
      {
        duration: 1,
      }
    );
  }, [isWaiting]);

  React.useEffect(() => {
    if (forklift.orders.length > 0) {
      const currentRoute = ROUTES.find(
        (item) => item.target === forklift.orders.slice(-1)[0].path.target_name
      );
      const currentPoint =
        forklift.orders.slice(-1)[0].check_points_time.length === 0
          ? (currentRoute?.routes[0].pointName as string)
          : forklift.orders.slice(-1)[0].check_points_time?.slice(-1)?.[0].point_name;
      let waiting = false;

      // console.log(currentRoute, forklift.id);

      const animatedData: AnimatedData = {
        currentPoint,
        findedIndex: currentRoute?.routes.findIndex(
          (item) => item.pointName === currentPoint
        ) as number,
        nextPoint: null,
        currentRoute,
        finishPoint: ROUTES.find(
          (item) => item.target === forklift.orders.slice(-1)[0].path.target_name
        )?.routes.slice(-1)[0].pointName,
        status: forklift.status,
      };

      console.log(forklift.orders.slice(-1)[0].path.target_name);
      console.log(animatedData.findedIndex, animatedData.finishPoint);

      if (animatedData.currentPoint === animatedData.finishPoint) {
        console.log("IS WAITING");
        console.log(
          forklift.orders
            .slice(-1)[0]
            .check_points_time.slice(-2)
            .every((item) => item.point_name === animatedData.finishPoint)
        );
        setIsWaiting(true);
        waiting = true;
        if (
          forklift.orders
            .slice(-1)[0]
            .check_points_time.slice(-2)
            .every((item) => item.point_name === animatedData.finishPoint)
        ) {
          const coords = POINTS_POSITIONS.find(
            (item) => item.checkPointName === currentRoute?.routes.slice(-2)[0].pointName
          )?.coords;
          // animateBackHorizontal(coords, 5);
          // setIsWaiting(false);
        }
        return;
      } else {
        waiting = false;
        setIsWaiting(false);
      }

      if (!waiting) {
        if (forklift.status === "PROCESSING_ORDER") {
          animatedData.nextPoint =
            currentRoute!.routes[animatedData.findedIndex + 1] ?? currentRoute!.routes.slice(-1)[0];
        } else {
          animatedData.nextPoint =
            currentRoute!.routes[animatedData.findedIndex - 1] ?? currentRoute!.routes[0];
        }
        setIsWaiting(false);
        if (
          animatedData.nextPoint?.pointName !== dataForAnimate?.nextPoint?.pointName &&
          dataForAnimate !== null
        ) {
          console.log(
            "JSON",
            JSON.stringify(
              dataForAnimate?.currentRoute?.routes[
                dataForAnimate.findedIndex + (dataForAnimate.status === "ENDING_ORDER" ? -1 : 1)
              ]
            )
          );
          const coords = POINTS_POSITIONS.find(
            (item) => item.checkPointName === dataForAnimate.nextPoint?.pointName
          )?.coords;

          if (dataForAnimate?.status === "ENDING_ORDER") {
            checkOrientation(true, dataForAnimate) === "horizontal"
              ? animateBackHorizontal(coords, 1)
              : animateBackVertical(coords, 1);
          } else {
            checkOrientation(false, dataForAnimate) === "horizontal"
              ? animateForwardHorizontal(coords, 1)
              : animateForwardVertical(coords, 1);
          }
        }

        // setIsAnimated(false);
      }
      setDataForAnimate(animatedData);
    }
  }, [forklift]);

  React.useEffect(() => {
    if (dataForAnimate && !isWaiting) {
      if (forklift.status === "ENDING_ORDER") {
        const coords = POINTS_POSITIONS.find(
          (item) => item.checkPointName === dataForAnimate?.nextPoint?.pointName
        )?.coords;

        if (
          (["K5", "K8", "K2"].includes(dataForAnimate.nextPoint!.pointName) &&
            ["K9", "K6", "K3"].includes(dataForAnimate.currentPoint)) ||
          (["K10", "K7", "K4"].includes(dataForAnimate.currentPoint) &&
            ["K9", "K6", "K3"].includes(dataForAnimate.nextPoint!.pointName))
        ) {
          if (!isAnimated) {
            setIsAnimated(true);
            animateBackHorizontal(coords, 13);
          }
        }

        if (
          ["K8", "K5", "K2"].includes(dataForAnimate.currentPoint) &&
          ["K5", "K2", "K1"].includes(dataForAnimate.nextPoint!.pointName)
        ) {
          if (!isAnimated) {
            setIsAnimated(true);
            animateBackVertical(coords, 11);
          }
        }
      } else {
        const coords = POINTS_POSITIONS.find(
          (item) => item.checkPointName === dataForAnimate.nextPoint?.pointName
        )?.coords;
        if (
          (["K9", "K6", "K3"].includes(dataForAnimate.nextPoint!.pointName) &&
            ["K5", "K8", "K2"].includes(dataForAnimate.currentPoint)) ||
          (["K9", "K6", "K3"].includes(dataForAnimate.currentPoint) &&
            ["K10", "K7", "K4"].includes(dataForAnimate.nextPoint!.pointName))
        ) {
          if (!isAnimated) {
            setIsAnimated(true);
            animateForwardHorizontal(coords, 15);
          }
        }

        if (
          ["K5", "K2", "K1"].includes(dataForAnimate.currentPoint) &&
          ["K8", "K5", "K2"].includes(dataForAnimate.nextPoint!.pointName)
        ) {
          if (!isAnimated) {
            setIsAnimated(true);
            animateForwardVertical(coords, 13);
          }
        }
      }
    }
    // setDataForAnimate(null);
  }, [dataForAnimate]);

  function getCurrentForkliftRoute(forklift: Forklift) {
    const points = forklift.orders.slice(-1)[0].check_points_time;

    if (points.length === 0) {
      return POINTS_POSITIONS[0];
    }

    const lastPoint = points[points.length - 1];

    return POINTS_POSITIONS.find((item) => item.checkPointName === lastPoint.point_name);
  }

  function checkOrientation(isEnding: boolean, data: any) {
    if (isEnding) {
      return (["K5", "K8", "K2"].includes(data.nextPoint!.pointName) &&
        ["K9", "K6", "K3"].includes(data.currentPoint)) ||
        (["K10", "K7", "K4"].includes(data.currentPoint) &&
          ["K9", "K6", "K3"].includes(data.nextPoint!.pointName))
        ? "horizontal"
        : "vertical";
    } else {
      return (["K9", "K6", "K3"].includes(data.nextPoint!.pointName) &&
        ["K5", "K8", "K2"].includes(data.currentPoint)) ||
        (["K9", "K6", "K3"].includes(data.currentPoint) &&
          ["K10", "K7", "K4"].includes(data.nextPoint!.pointName))
        ? "horizontal"
        : "vertical";
    }
  }

  function animateBackVertical(
    coords: { x: number; y: number } | undefined,
    duration: number = 13
  ) {
    animate(
      scope.current,
      {
        transform: "translate(40%, 80%) rotate(180deg)",
      },
      {
        duration: 1,
        onComplete: () =>
          setTimeout(() => {
            animate(
              scope.current,
              {
                // transform: "translate(80%, 40%) rotate(90deg)",
                right: `${coords?.x}px`,
                bottom: `${coords?.y}px`,
              },
              {
                duration,
                onComplete: () => setIsAnimated(false),
              }
            );
          }, 500),
      }
    );
  }

  function animateBackHorizontal(
    coords: { x: number; y: number } | undefined,
    duration: number = 13
  ) {
    animate(
      scope.current,
      {
        transform: "translate(80%, 40%) rotate(90deg)",
      },
      {
        duration: 1,
        onComplete: () =>
          setTimeout(() => {
            animate(
              scope.current,
              {
                // transform: "translate(80%, 40%) rotate(90deg)",
                right: `${coords?.x}px`,
                bottom: `${coords?.y}px`,
              },
              {
                duration,
                onComplete: () => setIsAnimated(false),
              }
            );
          }, 500),
      }
    );
  }

  function animateForwardVertical(
    coords: { x: number; y: number } | undefined,
    duration: number = 13
  ) {
    animate(
      scope.current,
      {
        transform: "translate(40%, 40%) rotate(0deg)",
      },
      {
        duration: 1,
        onComplete: () => {
          animate(
            scope.current,
            {
              // transform: "translate(80%, 40%) rotate(0deg)",
              right: `${coords?.x}px`,
              bottom: `${coords?.y}px`,
            },
            {
              duration,
              onComplete: () => setIsAnimated(false),
            }
          );
        },
      }
    );
  }

  function animateForwardHorizontal(
    coords: { x: number; y: number } | undefined,
    duration: number = 15
  ) {
    animate(
      scope.current,
      {
        transform: "translate(0, 40%) rotate(-90deg)",
      },
      {
        duration: 1,
        onComplete: () =>
          setTimeout(() => {
            animate(
              scope.current,
              {
                right: `${coords?.x}px`,
                bottom: `${coords?.y}px`,
              },
              {
                duration,
                onComplete: () => setIsAnimated(false),
              }
            );
          }, 500),
      }
    );
  }

  return (
    <div
      ref={scope}
      // className={`active-car-${index + 1}`}
      style={{
        display:
          dataForAnimate ||
          (forklift.orders.slice(-1)[0].check_points_time?.[0]?.point_name === "K1" &&
            (forklift.status === "PROCESSING_ORDER" || forklift.status === "ENDING_ORDER"))
            ? "block"
            : "none",
        transformOrigin: "center",
        position: "absolute",
        zIndex: 5,
        transform: "translate(40%, 40%) rotate(0deg)",
        right: POINTS_POSITIONS.find((item) => item.checkPointName === dataForAnimate?.currentPoint)
          ?.coords.x ?? getCurrentForkliftRoute(forklift)?.coords.x,
        bottom: POINTS_POSITIONS.find(
          (item) => item.checkPointName === dataForAnimate?.currentPoint
        )?.coords.y ?? getCurrentForkliftRoute(forklift)?.coords.y,
      }}>
      <Car
        onClick={() => setForkLiftsFroModal(forklift)}
        isWaiting={isWaiting}
        isBack={forklift.status === "ENDING_ORDER"}
        number={forklift.name}
      />
    </div>
  );
};

export default AnimatedCar;
