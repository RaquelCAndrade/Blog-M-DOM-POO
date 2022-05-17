import { iniciaModal } from "./criarPost.js";
import { criarDOM } from "./criarDOMpost.js";

class Api {
  static async createUser(data) {
    const response = await fetch(
      "https://api-blog-m2.herokuapp.com/user/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        if (data.status != "error") {
          iniciaModal("modalContainerSucesso");

          setTimeout(function () {
            window.location.href = "../../pages/login.html";
          }, 5000);
        } else {
          iniciaModal("modalContainerFracasso");

          setTimeout(function () {
            window.location.href = "./index.html";
          }, 3000);
        }
      });

    return response;
  }

  static async login(dataLogin) {
    await fetch("https://api-blog-m2.herokuapp.com/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataLogin),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.status != "error") {
          iniciaModal("modalLoginSucesso");

          localStorage.setItem("token", `${response.token}`);
          localStorage.setItem("userID", `${response.userId}`);

          setTimeout(function () {
            window.location = `../../pages/principal.html`;
          }, 5000);
        } else {
          iniciaModal("modalLoginFracasso");

          setTimeout(function () {
            window.location.href = "../../pages/login.html";
          }, 5000);
        }
      });
  }

  static async postList() {
    const response = await fetch(
      "https://api-blog-m2.herokuapp.com/post?page=1",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((resp) => resp.json())
      .then((resp) => {
        const arrDados = resp.data;
        criarDOM(arrDados);
      })
      .catch((err) => console.error(err));

    return response;
  }

  static async criarPost(post) {
    const response = await fetch("https://api-blog-m2.herokuapp.com/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(post),
    })
      .then((resp) => resp.json())
      .then((data) => data)
      .catch((err) => console.error(err));
    return response;
  }

  static async updatePost(postEdit, idPost) {
    const response = await fetch(
      `https://api-blog-m2.herokuapp.com/post/${idPost}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(postEdit),
      }
    )
      .then((resp) => resp.json())
      .then((data) => data)
      .catch((err) => console.error(err));

    return response;
  }

  static async deletePost(id) {
    const response = await fetch(
      `https://api-blog-m2.herokuapp.com/post/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response;
  }
}

export { Api };
