import { useFetch } from "@/utils/hooks/use-fetch";
import { getCurrentUserApi } from "../users";

export const useGetCurrentUser = () => {
  return useFetch({
    queryFn: (signal) => getCurrentUserApi(signal),
  });
};
