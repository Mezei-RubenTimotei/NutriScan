import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mealType } from "../dataTypes/types";
import { postMeal } from "../api/meals/postMeal";

export function usePostMeal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (meal: mealType) => {
      const result = await postMeal(meal);
      if (!result) {
        return Promise.reject("user not found");
      }
      console.log(
        "the meal " + result.name + " is added for the user " + result.id
      );
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["meals"] });
    },
  });
}
