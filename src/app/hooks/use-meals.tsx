import { useQuery } from "@tanstack/react-query";
import { getMeals } from "../api/getMeals";
import { mealType } from "../dataTypes/types";

export function useMeals(auth: boolean) {
  return useQuery({
    queryKey: ["meals", auth],
    queryFn: async () => {
      const result = await getMeals();
      if (!result) {
        return Promise.reject("meals not found");
      }
      return result as mealType[];
    },
    enabled: !!auth,
  });
}
