import { removeUserFromPresistentStorage } from "@/utils";
import { delete_api, get_api, post_api, put_api } from "@/utils/api-helpers";

export const getSizesOptionsApi = async () => {
  const res = await get_api("sizes/get/options");
  if (res.status === 401) {
    removeUserFromPresistentStorage();
    window.location.reload();
  }
  if (!res.ok) return Promise.reject("Unable to fetch options for sizes!");
  const parsedRes = await res.json();
  return parsedRes.data;
};

// Get all crusts
export const getSizes = async () => {
  const res = await get_api("sizes/get");
  if (res.status === 401) {
    removeUserFromPresistentStorage();
    window.location.reload();
  }
  if (!res.ok) return Promise.reject("Unable to fetch Sizes!");

  const parsedRes = await res.json();
  return parsedRes?.data;
};

// Create a new crust
export const createSizes = async (formData) => {
  const res = await post_api(
    "http://localhost:5000/api/admin/sizes/create",
    formData
  );
  if (res.status === 401) {
    removeUserFromPresistentStorage();
    window.location.reload();
  }
  if (!res.ok) return Promise.reject("Unable to create sizes!");
  const parsedRes = await res.json();
  return parsedRes;
};

// Update an existing crust
export const updateSizesApi = async (id, formData) => {
  const res = await put_api(`sizes/update/${id}`, formData);
  if (res.status === 401) {
    removeUserFromPresistentStorage();
    window.location.reload();
  }
  if (!res.ok) return Promise.reject("Unable to update sizes!");
  const parsedRes = await res.json();
  return parsedRes;
};

// Delete a crust by ID
export const deleteSizesApi = async (id) => {
  const res = await delete_api(`sizes/delete/${id}`);
  if (res.status === 401) {
    removeUserFromPresistentStorage();
    window.location.reload();
  }
  if (!res.ok) return Promise.reject("Unable to delete sizes!");
  return null;
};

// Get a crust by ID
export const getSizesByIdApi = async (id) => {
  if (!id) return { message: "Id Invalid!" };
  const res = await get_api(`sizes/${id}`);
  if (res.status === 401) {
    removeUserFromPresistentStorage();
    window.location.reload();
  }
  if (!res.ok) return Promise.reject("Unable to fetch crust!");

  const parsedRes = await res.json();
  return parsedRes?.data;
};
