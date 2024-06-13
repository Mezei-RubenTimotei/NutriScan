import { useQuery } from "@tanstack/react-query";
import { mealType } from "../dataTypes/types";
import { getMeals } from "../api/meals/getMeals";

export function useGetMeals(auth: boolean) {
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
