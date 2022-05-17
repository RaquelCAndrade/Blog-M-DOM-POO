function criarDOM(arrDados) {
  const main = document.getElementById("main");

  arrDados.forEach((item) => {
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
    dataPost.innerText = `${item.createdAt.split("-").reverse().join("/")}`;

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
}

export { criarDOM };
