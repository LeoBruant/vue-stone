export const getOptions = (method = "GET") => ({
  method: method,
  mode: "cors",
  headers: {
    "content-type": "application/json",
    authorization: `Bearer ${window.localStorage.getItem("jwt")}`,
  },
});
