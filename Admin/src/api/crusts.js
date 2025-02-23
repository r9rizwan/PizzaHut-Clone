import {
  delete_api,
  get_api,
  post_form_data,
  put_form_data,
} from "@/utils/api-helpers";

export { get_api } from "@/utils/api-helpers";

// Get all crusts
export const getCrusts = async () => {
  const res = await get_api("crusts/get"); // Corrected the path
  if (res.status === 401) {
    removeUserFromPresistentStorage();
    window.location.reload();
  }
  if (!res.ok) return Promise.reject("Unable to fetch crusts!");

  const parsedRes = await res.json();
  return parsedRes?.data;
};

// Create a new crust
export const createCrust = async (formData) => {
  const res = await post_form_data("crusts/create", formData);
  if (res.status === 401) {
    removeUserFromPresistentStorage();
    window.location.reload();
  }
  if (!res.ok) return Promise.reject("Unable to create crust!");
  const parsedRes = await res.json();
  return parsedRes;
};

// Update an existing crust
export const updateCrustApi = async (id, formData) => {
  const res = await put_form_data(`crusts/update/${id}`, formData);
  if (res.status === 401) {
    removeUserFromPresistentStorage();
    window.location.reload();
  }
  if (!res.ok) return Promise.reject("Unable to update crust!");
  const parsedRes = await res.json();
  return parsedRes;
};

// Delete a crust by ID
export const deleteCrustApi = async (id) => {
  const res = await delete_api(`crusts/delete/${id}`);
  if (res.status === 401) {
    removeUserFromPresistentStorage();
    window.location.reload();
  }
  if (!res.ok) return Promise.reject("Unable to delete crust!");
  return null;
};

// Get a crust by ID
export const getCrustByIdApi = async (id) => {
  if (!id) return { message: "Id Invalid!" };
  const res = await get_api(`crusts/${id}`);
  if (res.status === 401) {
    removeUserFromPresistentStorage();
    window.location.reload();
  }
  if (!res.ok) return Promise.reject("Unable to fetch crust!");

  const parsedRes = await res.json();
  return parsedRes?.data;
};
