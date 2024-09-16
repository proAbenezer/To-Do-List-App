const taskContainer = document.getElementById("tasks");
const form = document.getElementById("form");
const formInput = document.getElementById("form--input");

form.addEventListener("submit", handleFormSubmit);

const LOCAL_STORAGE_TASK_KEY = "todoapp.tasks.task";
tasks = localStorage.getItem(LOCAL_STORAGE_TASK_KEY)
  ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_TASK_KEY))
  : [];
window.onload = () => {
  renderElements();
  saveTasks();
};

function handleFormSubmit(e) {
  e.preventDefault();
  if (formInput.value == "") {
    alert("Please Enter a Task ");
    return;
  }
  addTask(formInput.value);
  formInput.value = "";
  saveTasks();
  renderElements();
}

taskContainer.addEventListener("click", handleTasks);

function renderElements() {
  taskContainer.innerHTML = "";
  tasks?.forEach((element) => {
    const taskElement = createElement("div", "task", "task");
    const taskNameLi = createElement(
      "li",
      "task__name--container",
      "name--container"
    );
    const taskName = createElement("input", "task__name", "task--name");
    const taskButtons = createElement("div", "task__buttons", "task--buttons");
    const taskEditButton = createElement(
      "button",
      "task__edit--button",
      "task--edit"
    );
    const taskRemoveButton = createElement(
      "button",
      "task__remove--button",
      "task--remove"
    );

    if (element.isCompleted == true) {
      taskName.classList.add("checked");
    }
    taskEditButton.classList.add("task__button");
    taskRemoveButton.classList.add("task__button");

    taskEditButton.innerHTML = "Edit";
    taskRemoveButton.innerHTML = "Delete";

    taskButtons.appendChild(taskEditButton);
    taskButtons.appendChild(taskRemoveButton);

    taskName.value = element.name;
    taskName.setAttribute("readonly", "readonly");
    taskElement.setAttribute("id", element.id);

    taskNameLi.appendChild(taskName);

    taskElement.appendChild(taskNameLi);
    taskElement.appendChild(taskButtons);

    taskContainer.appendChild(taskElement);
  });
}
function createElement(elementType, elementClass, elementId) {
  const element = document.createElement(elementType);
  element.classList.add(elementClass);
  element.setAttribute("id", elementId);
  return element;
}
function addTask(text) {
  console.log(tasks);
  tasks.unshift({
    id: Date.now().toString(),
    name: text,
    isCompleted: false,
  });
}

function handleTasks(e) {
  element = e.target;
  keyValue = element.id;

  sharedParentElement = element.parentElement.parentElement;
  switch (keyValue) {
    case "task--name":
      checkOffTask(sharedParentElement.id);
      break;
    case "task--edit":
    case "save":
      editTask(sharedParentElement);
      break;
    case "task--remove":
      deleteTask(sharedParentElement.id);
      break;
    default:
      break;
  }
  saveTasks();
}

function checkOffTask(id) {
  tasks.map((task) => {
    if (task.id == id) {
      task.isCompleted = !task.isCompleted;
    }
  });
  renderElements();
}

function editTask(element) {
  const editButton = element.childNodes[1].childNodes[0];
  const taskNameInput = element.childNodes[0].childNodes[0];

  if (editButton.id == "task--edit") {
    editButton.innerHTML = "Save";
    editButton.id = "save";
    taskNameInput.removeAttribute("readOnly");
    taskNameInput.focus();
  } else {
    editButton.innerHTML = "Edit";
    editButton.id = "task--edit";
    taskNameInput.setAttribute("readonly", "readonly");
    tasks.forEach((task) => {
      if (task.id == element.id) {
        task.name = taskNameInput.value;
      }
    });
  }
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id != id);
  saveTasks();
  renderElements();
}

function saveTasks() {
  localStorage.setItem(LOCAL_STORAGE_TASK_KEY, JSON.stringify(tasks));
}
