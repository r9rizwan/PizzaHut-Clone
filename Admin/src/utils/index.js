export const getUserAuthStatusFromPresistentStorage = () => {
  const userData = localStorage.getItem("userData");
  const token = localStorage.getItem("token");
  if (!userData || !token)
    return { userData: null, token: null, isAuthenticated: false };

  return { userData: JSON.parse(userData), token, isAuthenticated: true };
};

export const addUserToPresistentStorage = ({ user, token }) => {
  localStorage.setItem("userData", JSON.stringify(user));
  localStorage.setItem("token", token);
};

export const removeUserFromPresistentStorage = () => {
  localStorage.removeItem("userData");
  localStorage.removeItem("token");
};
