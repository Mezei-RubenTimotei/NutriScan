import axios from "axios";
import { API_URL } from "../../context/AuthContext";
import { goalResultType } from "../../dataTypes/types";

export const putGoal = async ({
  totalKCal,
  fats,
  proteins,
  carbohydrates,
}: goalResultType) => {
  try {
    const response = await axios.put(`${API_URL}/goal`, {
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
