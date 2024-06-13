import axios from "axios";
import { mealType } from "../../dataTypes/types";
import { API_URL } from "../../context/AuthContext";

type postMealResult = {
  id: string;
  userId: string;
  name: string;
};

export const postMeal = async ({
  name,
  totalKCal,
  carbohydrates,
  proteins,
  fats,
}: mealType) => {
  try {
    const response = await axios.post(`${API_URL}/meals`, {
      name,
      totalKCal,
      carbohydrates,
      proteins,
      fats,
    });
    return response.data as postMealResult;
  } catch (err) {
    throw err;
  }
};
