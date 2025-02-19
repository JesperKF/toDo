// Her laver jeg et tomt array, som jeg kalder toDoArr.
let toDoArr = [];

// Her laver jeg variabler der henter elementer i HTML'en
const inputField = document.getElementById("inputField");
const addButton = document.getElementById("addButton");
const arrayList = document.getElementById("arrayList");
const doneList = document.getElementById("doneList");

// Her laver jeg en funktion der tilføjer en opgave til toDoArr og opdaterer HTML'en
function addToArray() {
    const inputValue = inputField.value;

    if (inputValue) {
        const taskObj = { text: inputValue, done: false, id: self.crypto.randomUUID() };

        // Tilføjer inputtet til toDoArr
        toDoArr.push(taskObj);

        // console log af array
        console.log(toDoArr);

        // Laver et <li> item og tilføjer det til listen i HTML'en
        const listItem = createListItem(taskObj);

        arrayList.appendChild(listItem);

        // Tømmer input feltet
        inputField.value = "";

        // Her gemmes opgaverne i local storage
        saveTasksToLocalStorage();
    }
}

// Funktion til at oprette et <li> element for en opgave
function createListItem(taskObj) {
    const listItem = document.createElement("li");
    listItem.textContent = taskObj.text;
    listItem.dataset.id = taskObj.id;

    // Tilføjer eventlistener til <li> itemet og tilføjer classen "done" hvis det bliver klikket på
    listItem.addEventListener("click", () => {
        listItem.classList.toggle("done");
        taskObj.done = !taskObj.done;
        updateTaskList();
        saveTasksToLocalStorage();
    });

    // Opretter en delete knap og tilføjer en eventlistener til den
    // Eventlisteneren stopper propagation, så det ikke påvirker <li> itemet
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "-";
    deleteButton.addEventListener("click", (event) => {
        event.stopPropagation();
        deleteTask(taskObj.id);
    });

    listItem.appendChild(deleteButton);

    return listItem;
}

// Funktion til at opdatere listen i HTML'en
function updateTaskList() {
    arrayList.innerHTML = "";
    doneList.innerHTML = "";

// Her laver jeg en forEach loop der kører igennem toDoArr og tilføjer opgaverne til listen i HTML'en
    toDoArr.forEach(task => {
        const listItem = createListItem(task);
        if (task.done) {
            listItem.classList.add("done");
            doneList.appendChild(listItem);
        } else {
            arrayList.appendChild(listItem);
        }
    });
}

// Her laver jeg en eventlistener der lytter efter når knappen bliver klikket på og tilføjer en opgave til toDoArr
addButton.addEventListener("click", addToArray);

// Funktion til at slette en opgave
function deleteTask(id) {
    toDoArr = toDoArr.filter(task => task.id !== id);
    updateTaskList();
    saveTasksToLocalStorage();
}

// Funktion til at gemme opgaverne i local storage
function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(toDoArr));
}

// Funktion til at hente opgaverne fra local storage
function loadTasksFromLocalStorage() {
    const tasks = localStorage.getItem("tasks");
    if (tasks) {
        toDoArr = JSON.parse(tasks);
        updateTaskList();
    }
}

//Her hentes opgaverne fra local storage når siden indlæses
loadTasksFromLocalStorage();
