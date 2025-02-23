import { useEffect } from "react";
import { useState } from "react";

export const useFetch = ({ queryFn }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [key, setKey] = useState(Date.now());

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await queryFn(controller.signal);
        if (isMounted) {
          setData(res?.data);
        }
      } catch (error) {
        console.log(error)
        if (isMounted) {
          setErrors(error?.message ?? "Runtime Error!");
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    fetchData();

    return () => {
      controller.abort();
      isMounted = false;
    };
  }, [key]);

  const refetch = () => setKey(Date.now());

  return { data, isLoading, errors, refetch };
};
