import { Usuarios } from "./Usuarios.js";

const formLogin = document.getElementById("formLogin");
formLogin.addEventListener("submit", Usuarios.userLogin);
