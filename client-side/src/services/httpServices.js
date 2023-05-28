import axios from "axios";
import {getJwt} from "./userService";

axios.defaults.headers.common['x-auth-token'] = getJwt();

axios.interceptors.response.use(null, error => {
  const expectedError = error.response && error.response.status >= 403;
  if (expectedError) console.error("An unexpected error occurrred.");
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete
};