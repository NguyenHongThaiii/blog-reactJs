import axiosClient from "./axiosClient";

const categoriesApi = {
  getAll(params) {
    const url = "/categories";
    return axiosClient.get(url, { params });
  },
};

export default categoriesApi;
