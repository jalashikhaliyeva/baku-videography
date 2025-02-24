import axios from "axios";

export const instanceAxios = axios.create({
  baseURL: "https://video.markup.az/api/",
  headers: {
    Accept: "application/json, text/plain, */*",
  },
});
