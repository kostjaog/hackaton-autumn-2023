import { MONTHS } from "../data/months";

export const formatDate = (dateStr: string) => {
  const [year, month, day] = dateStr?.split("T")[0].split("-");

  return `${day} ${MONTHS[+month - 1]} ${year}`;
};
