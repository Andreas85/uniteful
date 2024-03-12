export const API_BASE_URL = "https://dummyjson.com";

interface RequestOptions {
  method: string;
  body?: any;
  headers?: { [key: string]: string };
  query?: { [key: string]: string };
}

function createRequest(
  url: string,
  options: RequestOptions,
  fetchFunction: any
): Promise<any> {
  const { method, body, headers, query } = options;
  const requestOptions = {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    baseURL: API_BASE_URL,
    query,
  };
  return fetchFunction(API_BASE_URL + url, requestOptions);
}

export function getRequest(
  url: string,
  options?: RequestOptions
): Promise<any> {
  return createRequest(url, { method: "GET", ...options }, $fetch);
}

export function postRequest(
  url: string,
  data: any,
  options?: RequestOptions
): Promise<any> {
  return createRequest(url, { method: "POST", body: data, ...options }, $fetch);
}

export function putRequest(
  url: string,
  data: any,
  options?: RequestOptions
): Promise<any> {
  return createRequest(url, { method: "PUT", body: data, ...options }, $fetch);
}

export function deleteRequest(
  url: string,
  options?: RequestOptions
): Promise<any> {
  return createRequest(url, { method: "DELETE", ...options }, $fetch);
}

// useFetch function works on server side
export function getRequestUseFetch(
  url: string,
  options?: RequestOptions
): Promise<any> {
  return createRequest(url, { method: "GET", ...options }, useFetch);
}
