import { GET_API, handleApiError } from "@/utils/api-helpers";

export const getPizzasApi = async (signal, queryString) => {
  try {
    const res = await GET_API(`/admin/products?${queryString}`, {
      signal: signal,
    });
    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getProductByIdApi = async (id, queryString) => {
  try {
    const res = await GET_API(
      queryString
        ? `/admin/products/${id}?${queryString}`
        : `/admin/products/${id}`
    );
    if (res.status === 401) {
      removeUserFromPresistentStorage();
      window.location.reload();
    }
    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getCrusts = async (sizeId) => {
  try {
    const res = await GET_API(
      sizeId ? `/admin/crusts/get?sizeId=${sizeId}` : "/admin/crusts/get"
    );
    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getSizes = async () => {
  try {
    const res = await GET_API("/admin/sizes/get");
    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
