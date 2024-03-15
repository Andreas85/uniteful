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

export const formatTimeForMinutes = (seconds: number) => {
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

  return `${formattedMinutes}:${formattedSeconds}`;
};

export const getUserDataInLocalStorage = () => {
  // return localStorage.getItem('token');
  const storedData = localStorage.getItem("united-user-data");
  return storedData ? JSON.parse(storedData) : null;
};

export const setUserDataInLocalStorage = (data: any) => {
  const stringifiedData = JSON.stringify(data);
  localStorage.setItem("united-user-data", stringifiedData);
};

export const handleQueryResponse = (error: any) => {
  const result = error?.data?.result?.errText;
  return result;
};
