import { mealType } from "../dataTypes/types";

export default function reduceMealAmount(
  valuesPer100g: mealType,
  grams: number
): mealType {
  const percentage = grams / 100;
  return {
    name: valuesPer100g.name,
    totalKCal: Math.round(valuesPer100g.totalKCal * percentage),
    fats: Math.round(valuesPer100g.fats * percentage),
    carbohydrates: Math.round(valuesPer100g.carbohydrates * percentage),
    proteins: Math.round(valuesPer100g.proteins * percentage),
  };
}
