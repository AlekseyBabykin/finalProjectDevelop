import axios from "axios";

const $host = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL: "/",
});

const $authHost = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL: "/",
});

const authInterceptor = (config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }

  return config;
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
