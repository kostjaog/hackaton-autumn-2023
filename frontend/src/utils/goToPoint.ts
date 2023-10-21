// import { RouteCheckPointName } from "../Types/Checkpoints";
// import { POINTS_POSITIONS } from "../data/points";

// export const goToBack = (animate: any, currentPoint: RouteCheckPointName, nextPoint: any, currentRoute: any) => {
//   const coords = POINTS_POSITIONS.find(
//     (item) => item.checkPointName === currentRoute?.routes[findedIndex - 1].pointName
//   )?.coords;
//   if (
//     ["K5", "K8", "K2"].includes(nextPoint!.pointName) &&
//     ["K9", "K6", "K3"].includes(currentPoint)
//   ) {
//     console.log("COORDS", coords);

//     animate(
//       `.active-car-${index + 1}`,
//       {
//         transform: "translate(80%, 40%) rotate(90deg)",
//       },
//       {
//         duration: 1,
//         onComplete: () =>
//           setTimeout(() => {
//             animate(
//               `.active-car-${index + 1}`,
//               {
//                 // transform: "translate(80%, 40%) rotate(90deg)",
//                 right: `${coords?.x}px`,
//                 bottom: `${coords?.y}px`,
//               },
//               {
//                 duration: 7,
//               }
//             );
//           }, 200),
//       }
//     );
//   }
// };

// export const goToForward = () => {};

export const test = () => {};
