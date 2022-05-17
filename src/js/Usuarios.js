import { Api } from "./Api.js";

function getData(event) {
  const formItens = [...event.target];
  const values = {};

  formItens.forEach((item) => {
    if (item.name != "") {
      values[item.name] = item.value;
    }
  });

  return values;
}

class Usuarios {
  static userRegister(event) {
    event.preventDefault();

    const data = getData(event);
    Api.createUser(data);
    localStorage.setItem("username", `${data.username}`);
    localStorage.setItem("avatar", `${data.avatarUrl}`);
  }

  static async userLogin(event) {
    event.preventDefault();

    const data = getData(event);
    await Api.login(data);
  }

  static async userPost(event) {
    event.preventDefault();
    const text = document.getElementById("input-post");
    const obj = {
      content: `${text.value}`,
    };

    await Api.criarPost(obj);
    text.value = "";
    window.location.reload();
  }

  static editPost(event) {
    event.preventDefault();
    const postId = event.target.id;
    if (event.target.className == "editar") {
      const edit = document.querySelector(".modal-input-editar");
      edit.classList.add("modal-mostrar");

      const formEdit = document.getElementById("editar-post");

      formEdit.addEventListener("submit", async (e) => {
        e.preventDefault();

        const textEdit = document.getElementById("text-editar-post");

        const obj = {
          newContent: `${textEdit.value}`,
        };
        console.log(obj.newContent);

        await Api.updatePost(obj, postId);
        textEdit.value = "";
        window.location.reload();
      });

      const fecharModal = document.getElementById("fechar");
      fecharModal.addEventListener("click", () => {
        edit.classList.remove("modal-mostrar");
      });
    }
  }

  static async userDelete(event) {
    event.preventDefault();
    const postId = event.target.id;
    if (event.target.className == "apagar") {
      await Api.deletePost(postId);
      window.location.reload();
    }
  }
}

export { Usuarios };
