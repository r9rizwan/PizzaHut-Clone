import { POST_API } from "@/utils/api-helpers";

export const loginApi = (body) => POST_API("/auth/login", body);
export const registerApi = (body) => POST_API("/auth/register", body);
