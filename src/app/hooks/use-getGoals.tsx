import { useQuery } from "@tanstack/react-query";
import { goalResult, mealType } from "../dataTypes/types";
import { getGoal } from "../api/goal/getGoal";

export function useGetGoal(auth: boolean) {
  return useQuery({
    queryKey: ["goal", auth],
    queryFn: async () => {
      const result = await getGoal();
      console.log(JSON.stringify(result), null, 4);
      if (!result) {
        return Promise.reject("goal not found");
      }
      return result as goalResult;
    },
    enabled: !!auth,
  });
}
