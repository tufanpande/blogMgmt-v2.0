import moment from "moment";

export const dateFormatter = (date, format = "lll") => {
  const currentDate = date || new Date();
  return moment(currentDate).format(format);
};