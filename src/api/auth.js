import axios from "axios";
import conf from "../conf";
export const authLogin = async (username, password) => {
  try {
    let result = await axios.post(`${conf.apiBaseUrl}/auth/login`, {
      username,
      password,
    });
    return result.data;
  } catch (err) {
    throw err;
  }
};
export const authRegister = async (username, password) => {
  try {
    let result = await axios.post(`${conf.apiBaseUrl}/auth/register`, {
      username,
      password,
    });
    return result.data;
  } catch (err) {
    throw err;
  }
};
