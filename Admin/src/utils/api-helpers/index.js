export const ADMIN_BASE_URL = "http://localhost:5000/api/admin";

export const resolveBasePath = (segment) => `${ADMIN_BASE_URL}/${segment}`;

export const post_api = (url, body) =>
  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      authorization: `BEARER ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });

export const put_api = (url, body) =>
  fetch(resolveBasePath(url), {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      authorization: `BEARER ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });

export const get_api = (segment) =>
  fetch(resolveBasePath(segment), {
    headers: { authorization: `BEARER ${localStorage.getItem("token")}` },
  });
export const delete_api = (segment, options = {}) =>
  fetch(resolveBasePath(segment), {
    method: "DELETE",
    headers: { authorization: `BEARER ${localStorage.getItem("token")}` },
    ...options,
  });

export const post_form_data = (segment, formData) =>
  fetch(resolveBasePath(segment), {
    method: "POST",
    headers: { authorization: `BEARER ${localStorage.getItem("token")}` },
    body: formData,
  });

export const put_form_data = (segment, formData) =>
  fetch(resolveBasePath(segment), {
    method: "PUT",
    headers: { authorization: `BEARER ${localStorage.getItem("token")}` },
    body: formData,
  });
