const toDoList = document.querySelector(".to_do_list");

const toDoArr = [
{id: self.crypto.randomUUID(), text: "Gåtur med lille Mona", done: false},
{id: self.crypto.randomUUID(), text: "Køb mælk med hjem", done: true}, 
{id: self.crypto.randomUUID(), text: "Øv din skala", done: false},
];

showToDo();

function showToDo() {
    toDoList.innerHTML = "";
    toDoArr.forEach((task) => {
        const li = document.createElement("li");
        li.innerHTML += `<h3>${task.text}</h3><button class="mark_toggle_done">Toggle done</button>`;
        li.classList.add(task.done?"colorDone" : "colorToDo");

        li.addEventListener("click", (evt) => {
            const currentTarget = evt.currentTarget;
            const target = evt.target;
            
                console.log("currentTarget", currentTarget);
                console.log("target", target);

                if (target.classList.contains("mark_toggle_done")) {
                    console.log("JEG HAR KLIKKET PÅ TOGGLE DONE");
                    task.done = !task.done;
                  
                    console.log("toDoArr", toDoArr);
                    showToDo();
                }
        });
        toDoList.appendChild(li);
    });
}