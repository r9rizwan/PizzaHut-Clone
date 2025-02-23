import {
  delete_api,
  get_api,
  post_form_data,
  put_form_data,
} from "@/utils/api-helpers";

export { get_api } from "@/utils/api-helpers";

export const getProducts = async () => {
  const res = await get_api("products");
  if (res.status === 401) {
    removeUserFromPresistentStorage();
    window.location.reload();
  }
  if (!res.ok) return Promise.reject("Unable to fetch products!");

  const parsedRes = await res.json();
  return parsedRes?.data;
};

export const createProduct = async (formData) => {
  const res = await post_form_data("products/create", formData);
  if (res.status === 401) {
    removeUserFromPresistentStorage();
    window.location.reload();
  }
  if (!res.ok) return Promise.reject("Unable to create product!");
  const parsedRes = await res.json();
  return parsedRes;
};

export const updateProductApi = async (id, formData) => {
  const res = await put_form_data(`products/update/${id}`, formData);
  if (res.status === 401) {
    removeUserFromPresistentStorage();
    window.location.reload();
  }
  if (!res.ok) return Promise.reject("Unable to update product!");
  const parsedRes = await res.json();
  return parsedRes;
};

export const deleteProductApi = async (id) => {
  const res = await delete_api(`products/delete/${id}`);
  if (res.status === 401) {
    removeUserFromPresistentStorage();
    window.location.reload();
  }
  if (!res.ok) return Promise.reject("Unable to delete product!");
  return null;
};

export const getProductByIdApi = async (id) => {
  const res = await get_api(`products/${id}`);
  if (res.status === 401) {
    removeUserFromPresistentStorage();
    window.location.reload();
  }
  if (!res.ok) return Promise.reject("Unable to fetch products!");

  const parsedRes = await res.json();
  return parsedRes?.data;
};
