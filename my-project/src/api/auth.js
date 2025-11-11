import axios from "axios";

const BASE_URL = "http://localhost:5001";

export async function registerUser({ email, password, name }) {
  const res = await axios.post(`${BASE_URL}/users`, {
    email,
    password,
    name,
    isAdmin: false
  });
  return res.data;
}

export async function loginUser({ email, password }) {
  const res = await axios.get(`${BASE_URL}/users`, {
    params: { email, password }
  });
  if (res.data.length === 0) throw new Error("Invalid credentials");
  return res.data[0];
}
