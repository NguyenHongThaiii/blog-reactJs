import axiosClient from "./axiosClient";

const usersApi = {
  login(data) {
    const url = "/users/login";
    return axiosClient.post(url, data);
  },
  getAll(params) {
    const url = `/users`;
    return axiosClient.get(url, { params });
  },
  get(id) {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },
  signup(data) {
    const url = "/users/signup";
    return axiosClient.post(url, data);
  },
  logout() {
    const url = "/users/logout";
    return axiosClient.post(url);
  },
};

export default usersApi;
