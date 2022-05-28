import { getLocalStorage } from "../src/utils";
import axiosClient from "./axiosClient";

const blogsApi = {
  getAll(params) {
    const url = "/blogs";
    return axiosClient.get(url, {
      params,
    });
  },
  get(id) {
    const url = `/blogs/place/${id}`;
    return axiosClient.get(url);
  },
  create(data) {
    const url = "/blogs";
    return axiosClient.post(url, data);
  },
  createBlogSaved(data) {
    const url = `/blogs/blogSaved/${data.userId}`;
    return axiosClient.post(url, data);
  },
  update(data, id) {
    const url = `/blogs/${id}`;
    return axiosClient.get(url, data);
  },
  delete(id) {
    const url = `/blogs/${id}`;
    return axiosClient.get(url);
  },
};

export default blogsApi;
