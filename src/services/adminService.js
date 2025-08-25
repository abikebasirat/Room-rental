import axios from "axios";

const API_URL = "http://localhost:3500/api/admin/user/:id/make-admin";

export const getUsers = async (token) => {
  const res = await axios.get(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const makeAdmin = async (id, token) => {
  const res = await axios.put(
    `${API_URL}/user/${id}/make-admin`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
