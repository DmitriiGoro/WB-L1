const moment = require("moment");

export const getDate = (format = { dateFormat: "L" }) => {
  const { dateFormat } = format;
  return moment().format(dateFormat);
};
