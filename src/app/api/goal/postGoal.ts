import axios from "axios";
import { API_URL } from "../../context/AuthContext";
import { goalResultType } from "../../dataTypes/types";

export const postGoal = async ({
  totalKCal,
  fats,
  proteins,
  carbohydrates,
}: goalResultType) => {
  try {
    const response = await axios.post(`${API_URL}/goal`, {
      totalKCal,
      fats,
      proteins,
      carbohydrates,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};
