import axios from "axios";

axios.defaults.withCredentials = true;

export default axios.create({
  baseURL: import.meta.env.CITAS_API_URL ?? "http://localhost:3000",
});
