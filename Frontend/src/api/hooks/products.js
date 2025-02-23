import { useFetch } from "@/utils/hooks/use-fetch";
import { getPizzasApi } from "../products";

// in a file we have passed a argument in a function e.g, testFunc(arg)
// suppose same function is passed as reference in some other file, there we have a requirement of passing some more arguments with previous.
// In this case we wrap the function with a callback and received previous arguments as a parameter there and passes new arguments with received parameters

export const useGetPizzas = (queryString) => {
  return useFetch({
    // queryFn: getPizzasApi
    queryFn: (signal) => getPizzasApi(signal, queryString),
  });
};
