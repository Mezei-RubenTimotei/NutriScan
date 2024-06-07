import React from "react";
import { exerciseLvl } from "./../config/constants";
import { goalResult } from "../dataTypes/types";

//BMR = Base maintenance rate
//rule: 30% protein , 35% fats, 35% carbs
// 1 carb/protein => 4 kcal    1 fat => 9kcal

type Props = {
  gender: string;
  age: number;
  weight: number;
  height: number;
  activity: string;
  goalOption: string;
};

function kcalToMacros(kcal: number): goalResult {
  return {
    kcal: kcal,
    fats: Math.round((0.35 * kcal) / 9),
    carbs: Math.round((0.35 * kcal) / 4),
    proteins: Math.round((0.3 * kcal) / 4),
  };
}

function tdeeCalculator({
  gender,
  age = 0,
  weight = 0,
  height = 0,
  activity = "sedentary",
  goalOption = "Maintenance",
}: Props): goalResult {
  const BMR_Male = 10 * weight + 6.25 * height - 5 * age + 5;
  const BMR_Female = 10 * weight + 6.25 * height - 5 * age - 161;

  var kcalMale = Math.round(exerciseLvl[activity] * BMR_Male);
  var kcalFemale = Math.round(exerciseLvl[activity] * BMR_Female);

  switch (goalOption) {
    case "Maintenance": {
      return gender == "male"
        ? kcalToMacros(kcalMale)
        : kcalToMacros(kcalFemale);
    }
    case "Bulk": {
      return gender == "male"
        ? kcalToMacros(kcalMale + 500)
        : kcalToMacros(kcalFemale + 500);
    }
    case "Cut": {
      return gender == "male"
        ? kcalToMacros(kcalMale - 500)
        : kcalToMacros(kcalFemale - 500);
    }
  }
}

export default tdeeCalculator;
