// src/utils/token.ts
const TOKENKEY = "token_key";

function setToken(token) {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKENKEY, token);
    console.log("Token set in localStorage:", localStorage.getItem(TOKENKEY));
  }
}

function getToken() {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem(TOKENKEY);
    console.log("getToken() called, token:", token);
    return token;
  }
  return null;
}

function removeToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKENKEY);
    console.log("Token removed from localStorage");
  }
}

export { setToken, getToken, removeToken };
