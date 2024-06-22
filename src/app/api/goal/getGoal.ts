import axios from "axios";
import { API_URL } from "../../context/AuthContext";
import { goalResultType } from "../../dataTypes/types";

export const getGoal = async () => {
  try {
    const response = await axios.get(`${API_URL}/goal`);
    return response.data as goalResultType;
  } catch (err) {
    throw err;
  }
};
