import axios from "axios";
import { API_URL } from "../../context/AuthContext";
import { mealType } from "../../dataTypes/types";

export const getMeals = async () => {
  try {
    const response = await axios.get(`${API_URL}/meals`);
    return response.data as mealType[];
  } catch (err) {
    throw err;
  }
};
