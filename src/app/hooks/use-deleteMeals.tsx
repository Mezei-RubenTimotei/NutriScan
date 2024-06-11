import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteAllMeals } from "../api/deleteAllMeals";

export function useDeleteMeals(deleted: boolean) {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: [],
    queryFn: async () => {
      const result = await deleteAllMeals();
      queryClient.invalidateQueries({ queryKey: ["meals"] });
      if (!result) {
        return Promise.reject("user not found");
      }
      console.log("the meals for the user " + result.id + " are deleted");
    },
    enabled: !!deleted,
  });
}
