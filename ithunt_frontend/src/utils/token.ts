function getToken() {
  if (typeof window !== "undefined") {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData.token;
    console.log("getToken() called, token:", token);
    return token;
  }
  return null;
}

export { getToken };
