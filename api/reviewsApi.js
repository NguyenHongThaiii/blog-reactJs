import axiosClient from "./axiosClient";
const reviewsApi = {
  getAll(params) {
    const url = "/reviews";
    return axiosClient.get(url, { params });
  },
  create(data) {
    const url = "/reviews";
    return axiosClient.post(url, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

export default reviewsApi;
