import { URL } from "./config";
import jwtDecode from "jwt-decode";
import axios from "axios";
import http from "./httpServices";

 const tokenKey = "token";

export function getJwt() {
return localStorage.getItem('token');
}

export async function logout() {
  localStorage.removeItem('token')
  .then(() => window.location = '/')
}


export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function members(){
  return http.get(`${URL}/users/get`)
}

export async function login(email, password) {
  const { data } = await axios.post(`${URL}/auth`, { email , password });
  localStorage.setItem(tokenKey, data.token);
  if (data.token) window.location = "/";
  else alert('לא הצלחת להתחבר כראוי')
}

export default {
  login,
  getCurrentUser,
  logout,
  getJwt,
  members
};