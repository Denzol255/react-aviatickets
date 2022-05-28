import { ISegment } from "../models/ISegment";
import { format } from "date-fns";

const daysOfWeek = {
  Mon: "пн",
  Tue: "вт",
  Wed: "ср",
  Thu: "чт",
  Fri: "пт",
  Sat: "сб",
  Sun: "вс",
};

const months = {
  Jan: "янв.",
  Feb: "фев.",
  Mar: "марта",
  Apr: "апр.",
  May: "мая",
  Jun: "июня",
  Jul: "июля",
  Aug: "авг.",
  Sep: "сен.",
  Oct: "окт.",
  Nov: "нояб.",
  Dec: "дек.",
};

// Функция получения даты и времени
export const getTimeAndDate = (fullInfo: ISegment): Array<string> => {
  const dayOfWeekArrival = format(new Date(fullInfo.arrivalDate), "EEE");
  const monthArrival = format(new Date(fullInfo.arrivalDate), "LLL");
  const timeArrival = format(new Date(fullInfo.arrivalDate), "HH:mm");
  const dayArrival = format(new Date(fullInfo.arrivalDate), "d");
  const dayOfWeekDeparture = format(new Date(fullInfo.departureDate), "EEE");
  const monthDeparture = format(new Date(fullInfo.departureDate), "LLL");
  const timeDeparture = format(new Date(fullInfo.departureDate), "HH:mm");
  const dayDeparture = format(new Date(fullInfo.departureDate), "d");
  return [
    timeDeparture,
    `${dayDeparture} ${months[monthDeparture as keyof typeof months]} ${
      daysOfWeek[dayOfWeekDeparture as keyof typeof daysOfWeek]
    }`,
    timeArrival,
    `${dayArrival} ${months[monthArrival as keyof typeof months]} ${
      daysOfWeek[dayOfWeekArrival as keyof typeof daysOfWeek]
    }`,
  ];
};
