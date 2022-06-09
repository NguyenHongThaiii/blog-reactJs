import axiosClient from "./axiosClient";
const repliesApi = {
  getAll(params) {
    const url = "/replies";
    return axiosClient.get(url, { params });
  },

  get(id) {
    const url = `/replies/${id}`;
    return axiosClient.get(url);
  },
  create(data) {
    const url = "/replies";
    return axiosClient.post(url, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

export default repliesApi;
