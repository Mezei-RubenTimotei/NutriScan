import { goalResult, mealType } from "../dataTypes/types";

export default function calculateProgress(meals: mealType[]): goalResult {
  return meals?.reduce(
    (accumulator, currentMeal) => ({
      totalKCal: accumulator.totalKCal + currentMeal.totalKCal,
      carbohydrates: accumulator.carbohydrates + currentMeal.carbohydrates,
      proteins: accumulator.proteins + currentMeal.proteins,
      fats: accumulator.fats + currentMeal.fats,
    }),
    { totalKCal: 0, carbohydrates: 0, proteins: 0, fats: 0 } // Initial accumulator values
  );
}
