import { Api } from "./Api.js";
import { Usuarios } from "./Usuarios.js";

const avatar = document.getElementById("avatar");
avatar.src = localStorage.getItem("avatar");

const userName = document.getElementById("nome_usuario");
userName.innerText = localStorage.getItem("username");

const formInput = document.getElementById("input");
formInput.addEventListener("submit", Usuarios.userPost);

const main = document.getElementById("main");
main.addEventListener("click", Usuarios.editPost);
main.addEventListener("click", Usuarios.userDelete);

const logoff = document.getElementById("btn-loggof");
logoff.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userID");
  window.location.href = "./login.html";
});

Api.postList();
