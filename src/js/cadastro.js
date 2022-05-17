import { Usuarios } from "./Usuarios.js";

const formResgister = document.getElementById("formCadastro");
formResgister.addEventListener("submit", Usuarios.userRegister);
