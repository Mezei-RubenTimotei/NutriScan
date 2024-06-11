import axios from "axios";
import { API_URL } from "../context/AuthContext";
import { mealType } from "../dataTypes/types";

export const deleteAllMeals = async () => {
  try {
    const response = await axios.delete(`${API_URL}/meals`);
    return response.data.id;
  } catch (err) {
    throw err;
  }
};
