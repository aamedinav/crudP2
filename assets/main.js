let form = document.getElementById("input-item");
let bookTitle = document.getElementById("book-title");
let bookAuthor = document.getElementById("book-author");
let bookYear = document.getElementById("book-year");
let message = document.getElementById("error-message");
let itemArea = document.getElementById("item-area");

form.addEventListener("submit", (element) => {
  element.preventDefault();
  console.log("button clicked");
  formValidation();
});

let formValidation = () => {
  if (bookTitle.value === "" || bookAuthor.value === "" || bookYear.value=== "") {
    message.innerHTML = "Ingrese todos los datos";
    console.log("error");
  } else {
    console.log("success");
    message.innerHTML = "";
    enterData();
  }
};

let data = [];

let enterData = () => {
  data.push({
    title: bookTitle.value,
    author: bookAuthor.value,
    year: bookYear.value,
  });
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
  insertItem();
  clearForm();
};


let insertItem = () => {
  itemArea.innerHTML = "";
  data.map((x, y) => {
    return (itemArea.innerHTML += `
    <article id=${y}>
      <div class="title-container">${x.title}</div>
      <div class="author-container">${x.author}</div>
      <div class="year-container">${x.year}</div>
      <div class="options">
        <button class="edit-button" type="button" onClick="editItem(this)">Editar</button>
        <button class="trash-button" type="button" onClick="deleteItem(this)">Borrar</button>
      </div>
    </article>
    `);
  });
  clearForm();
};

let deleteItem = (element) => {
  element.parentElement.parentElement.remove();
  data.splice(element.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
};

let editItem = (element) => {
  let selectedItem = element.parentElement.parentElement;
  bookTitle.value = selectedItem.children[0].innerHTML;
  bookAuthor.value = selectedItem.children[1].innerHTML;
  bookYear.value = selectedItem.children[2].innerHTML;
  deleteItem(element);
};

let clearForm = () => {
  bookTitle.value = "";
  bookAuthor.value = "";
  bookYear.value = "";
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  console.log(data);
  insertItem();
})();