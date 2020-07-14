import axios from "axios";
import conf from "../conf";

export const createNewEmail = async (token, recipient, subject, content) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    let result = await axios.post(
      `${conf.apiBaseUrl}/messages`,
      {
        recipient,
        subject,
        content,
      },
      config
    );
    return result.data;
  } catch (err) {
    return err;
  }
};
export const getAllEmails = async (token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    let result = await axios.get(`${conf.apiBaseUrl}/messages`, config);
    return result.data;
  } catch (err) {
    throw err;
  }
};
export const deleteEmailById = async (token, id) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    let result = await axios.delete(
      `${conf.apiBaseUrl}/messages/${id}`,
      config
    );
    return result.data;
  } catch (err) {
    throw err;
  }
};
