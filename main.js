const addButton = document.querySelector(".addToDo");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".fa-circle-xmark");
const confirm = document.querySelector(".button");
const toDoName = document.querySelector(".modal-content input");
const toDoList = document.querySelector(".toDos");
const searchBox = document.querySelector(".container input");

let dataBase = null;
if (localStorage.getItem("data") === null) {
  dataBase = [];
} else {
  dataBase = JSON.parse(localStorage.getItem("data"));
}

const showItems = (myArray) => {
  myArray.forEach((data) => {
    let newToDo = document.createElement("div");
    newToDo.classList.add("toDoItem");
    let toDoContent = document.createElement("h4");
    toDoContent.innerText = data.name;
    newToDo.appendChild(toDoContent);
    const icons = document.createElement("div");
    icons.classList.add("icons");
    const icon = document.createElement("i");
    icon.classList.add("fa-trash-can");
    icon.classList.add("fa-solid");
    icon.addEventListener("click", () => deleteHandler(data.id));
    icons.appendChild(icon);
    newToDo.appendChild(icons);
    if (data.done) {
      newToDo.classList.add("done-todo");
    }
    newToDo.addEventListener("click", () => statusHandler(data, newToDo));
    toDoList.appendChild(newToDo);
  });
};

const addNewToDoHandler = () => {
  const toDo = {};
  toDo.name = toDoName.value;
  toDo.done = false;
  toDo.id = dataBase.length;
  dataBase.push(toDo);
  localStorage.setItem("data", JSON.stringify(dataBase));
  toDoList.innerHTML = "";
  showItems(dataBase);
  modal.classList.toggle("un-hide");
  addButton.classList.remove("clicked-toDo");
  toDoName.value = "";
  const items = document.querySelectorAll(".toDoItem");
  items[items.length - 1].classList.add("add-animation");
};

const deleteHandler = (id) => {
  dataBase = dataBase.filter((data) => {
    return data.id !== id;
  });
  localStorage.setItem("data", JSON.stringify(dataBase));
  toDoList.innerHTML = "";
  searchBox.value = "";
  showItems(dataBase);
};

const searchHandler = () => {
  toDoList.innerHTML = "";
  const searchedArray = dataBase.filter((data) => {
    return data.name.includes(searchBox.value);
  });
  if (searchBox.value === "") {
    showItems(dataBase);
  } else {
    showItems(searchedArray);
  }
};

const statusHandler = (data, myDiv) => {
  if (data.done) {
    data.done = false;
  } else {
    data.done = true;
  }
  myDiv.classList.toggle("done-todo");
  localStorage.setItem("data", JSON.stringify(dataBase));
};

addButton.addEventListener("click", () => {
  addButton.classList.toggle("clicked-toDo");
  modal.classList.toggle("un-hide");
});

closeModal.addEventListener("click", () => {
  addButton.classList.remove("clicked-toDo");
  modal.classList.remove("un-hide");
});

modal.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    addNewToDoHandler();
  }
});

confirm.addEventListener("click", addNewToDoHandler);
searchBox.addEventListener("keyup", searchHandler);

showItems(dataBase);