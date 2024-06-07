import { useQuery } from "@tanstack/react-query";
import { getProductInfo } from "../api/getProductInfo";

export function useProductInfo(barcode: string) {
  return useQuery({
    queryKey: ["product", barcode],
    queryFn: async () => {
      const result = await getProductInfo(barcode);
      if (!result) {
        return Promise.reject("not found");
      }
      return result;
    },
    enabled: true,
  });
}
