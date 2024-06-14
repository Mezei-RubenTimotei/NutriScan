import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAllMeals } from "../api/meals/deleteAllMeals";
import { getGoal } from "../api/goal/getGoal";
import { useGetGoal } from "./use-getGoals";
import { postGoal } from "../api/goal/postGoal";
import { goalResultType } from "../dataTypes/types";
import { putGoal } from "../api/goal/putGoal";

export function useUpdateGoal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (goal: goalResultType) => {
      let postResult;
      try {
        await getGoal();
      } catch (eror) {
        postResult = await postGoal(goal);
        queryClient.setQueriesData({ queryKey: ["goal"] }, goal);
      }
      const putResult = await putGoal(goal);
      if (!putResult && !postResult) {
        return Promise.reject("unexpected error");
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["goal"] });
    },
  });
}
