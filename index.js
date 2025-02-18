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
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "-";
    deleteButton.addEventListener("click", (event) => {
        event.stopPropagation();
        deleteTask(taskObj.id);
    });

    listItem.appendChild(deleteButton);

    return listItem;
}

// Funktion til at opdatere opgavelisterne
function updateTaskList() {
    arrayList.innerHTML = "";
    doneList.innerHTML = "";

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
}






// const toDoList = document.querySelector(".to_do_list");

// const toDoArr = [
// {id: self.crypto.randomUUID(), text: "Gåtur med lille Mona", done: false},
// {id: self.crypto.randomUUID(), text: "Køb mælk med hjem", done: true}, 
// {id: self.crypto.randomUUID(), text: "Øv din skala", done: false},
// ];

// showToDo();

// function showToDo() {
//     toDoList.innerHTML = "";
//     toDoArr.forEach((task) => {
//         const li = document.createElement("li");
//         li.innerHTML += `<h3>${task.text}</h3><button class="mark_toggle_done">Toggle done</button>`;
//         li.classList.add(task.done?"colorDone" : "colorToDo");

//         li.addEventListener("click", (evt) => {
//             const currentTarget = evt.currentTarget;
//             const target = evt.target;
            
//                 console.log("currentTarget", currentTarget);
//                 console.log("target", target);

//                 if (target.classList.contains("mark_toggle_done")) {
//                     console.log("JEG HAR KLIKKET PÅ TOGGLE DONE");
//                     task.done = !task.done;
                  
//                     console.log("toDoArr", toDoArr);
//                     showToDo();
//                 }
//         });
//         toDoList.appendChild(li);
//     });
// }