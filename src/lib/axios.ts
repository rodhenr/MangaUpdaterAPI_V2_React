import Axios from "axios";

export const axios = Axios.create({
  baseURL: "http://localhost:5030",
});

// axios interceptors