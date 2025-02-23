import { useEffect } from "react";
import { useState } from "react";

export const useQuery = ({ queryFn, enabled = true }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState();

  useEffect(() => {
    if (enabled) {
      let isMounted = true;

      async function fetchData() {
        try {
          if (!isLoading && isMounted) setIsLoading(true);
          const res = await queryFn();
          if (isMounted) setData(res);
        } catch (error) {
          if (isMounted) setErrors(error);
        } finally {
          if (isMounted) setIsLoading(false);
        }
      }
      fetchData();
      return () => (isMounted = false);
    }
  }, [enabled]);

  return { data, isLoading, errors };
};
