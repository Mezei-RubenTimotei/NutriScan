import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAllMeals } from "../api/deleteAllMeals";
import { postMeal } from "../api/postMeal";
import { mealType } from "../dataTypes/types";

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
    onMutate: async (meal: mealType) => {
      await queryClient.cancelQueries({ queryKey: ["meals"] });

      const previousData = queryClient.getQueryData(["meals"]);

      queryClient.setQueriesData({ queryKey: ["meals"] }, { meal });

      return { previousData };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(["meals"], context.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["meals"] });
    },
  });
}
