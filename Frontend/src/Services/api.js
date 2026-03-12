import axios from "axios";

const api = axios.create({baseURL:"http://127.0.0.1:8000"},);          /* the baseURL is fixed into api */

api.interceptors.request.use((config) => {                             /* when the api request sent from browser it is paused here */
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;              /* the bearer token is attaced here with the API requests */
    }
    return config;                                                     /* the configured data sent back to backend */
});

api.interceptors.response.use(
  (response) => response,

  (error) => {

    if (error.response && error.response.status === 401) {

      localStorage.removeItem("token");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;