import moment from "moment";

export function capitalizeFirstLetter(data: string) {
  return data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
}

export function getTodayDate() {
  return new Date().toISOString().substr(0, 10);
}

export function getISODate(data: string) {
  return moment.utc(data).toISOString();
}
export function getRequiredDataFormat(data: string, format: "") {
  const dateFormat = format ?? "YYYY-MM-DD";
  return moment(data).format(dateFormat);
}
