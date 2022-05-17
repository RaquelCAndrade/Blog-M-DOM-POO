import { iniciaModal } from "./criarPost.js";

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
            window.location.href = "./cadastro.html";
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
        const main = document.getElementById("main");

        resp.data.forEach((item) => {
          const sectionPost = document.createElement("section");
          sectionPost.classList.add("post-container");

          const divImg = document.createElement("div");
          divImg.classList.add("img-post");
          const imgPost = document.createElement("img");
          imgPost.id = "imgAvatar_Post";
          imgPost.src = `${item.owner.avatarUrl}`;
          imgPost.alt = "Avatar Usuario";

          divImg.appendChild(imgPost);

          const divPost = document.createElement("div");
          divPost.classList.add("content-post");
          const titulo = document.createElement("h2");
          titulo.id = "title-post";
          titulo.innerText = `${item.owner.username}`;
          const postText = document.createElement("p");
          postText.classList.add("text-post");
          postText.innerText = `${item.post}`;

          divPost.append(titulo, postText);

          const divEdit = document.createElement("div");
          divEdit.classList.add("edit-post");
          const dataPost = document.createElement("span");
          dataPost.classList.add("data");
          dataPost.innerText = `${item.createdAt
            .split("-")
            .reverse()
            .join("/")}`;

          divEdit.appendChild(dataPost);
          sectionPost.append(divImg, divPost, divEdit);
          main.appendChild(sectionPost);

          if (item.owner.id === localStorage.getItem("userID")) {
            const editar = document.createElement("span");
            editar.classList.add("editar");
            editar.innerText = "Editar";
            editar.id = item.id;

            const apagar = document.createElement("span");
            apagar.classList.add("apagar");
            apagar.innerText = "Apagar";
            apagar.id = item.id;

            divEdit.append(editar, apagar, dataPost);
            sectionPost.append(divEdit);
            main.appendChild(sectionPost);
          }
        });
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
      .then((data) => console.log(data))
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
