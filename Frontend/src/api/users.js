import { GET_API, handleApiError } from "@/utils/api-helpers";

export const getCurrentUserApi = async (body) => {
  try {
    const res = await GET_API("/admin/users/get-current", body);
    return res.data;
  } catch (error) {
    return handleApiError(error);
  }
};
