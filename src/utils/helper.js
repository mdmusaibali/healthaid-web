import { format, differenceInCalendarYears } from "date-fns";

export const formatDate = (date, type) => {
  if (type === "general") return format(date, "dd MMM, yyyy");
  if (type === "api") return format(date, "yyyy-MM-dd");

  const birthdate = new Date(date);
  const today = new Date();
  const age = differenceInCalendarYears(today, birthdate);
  if (type === "age") return age;

  return "2001-01-01";
};

export const sleeper = (duration) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("");
    }, duration);
  });
};
