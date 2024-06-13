import axios from "axios";
import { API_URL } from "../../context/AuthContext";

export const deleteAllMeals = async () => {
  try {
    const response = await axios.delete(`${API_URL}/meals`);
    return response.data.id;
  } catch (err) {
    throw err;
  }
};
