import { post_api } from "@/utils/api-helpers";

export const loginApi = (body) =>
  post_api("http://localhost:5000/api/auth/login/admin", body);
