//elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
//classes names
const CHECK ="fa-check-circle";
const UNCHECK ="fa-circle-thin";
const LINE_THROUGH = "lineThrough";
//variables
let LIST, id;
//get item from local storage
let data = localStorage.getItem("TODO");
//check if data is not empty
if (data){
    LIST = JSON.parse.(data);
    id = LIST.length;
    loadList(LIST);
}else{
    //if data isnt empty
    LIST = [];
    id = 0;
}
//load items to the users interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    })
}
//clear local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
})
// Shows todays date
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US, options");
//add a to-do // update toDo
function addToDo(toDo, id, done, trash) {
    if (trash){
        return;
    }  
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const text =   `<li id="item">
                        <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                        <p class="text ${LINE}"> ${toDo} </p>
                        <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                    </li>`
    const position = "beforehand";
    list.insertAdjacentHTML(position, text);
}
// add an item to list
document.addEventListener("keyup",function(event){
    if(event.keycode == 13){
        const toDo = input.value;
        //if input isn't empty
        if(toDo){
                addToDo(toDo, id, false, false);
                LIST.push(
                        {name: toDo,
                        id: id,
                        done: false,
                        trash: false}
                );           
                    //add item to local storage
                    localStorage.setItem("TODO", JSON.stringify(LIST));          
                     id++;
        }
        input.value="";
       }
});
// to-do complete
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? false : true;
}
//remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    List[element.id].trash = true;
}
//target items created
list.addEventListener("click", function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;
    if(elementJob == "complete"){
            completeToDo(element);
    }else if(elementJob == "delete"){
            removeToDo(element);
    }
        //add item to local storage
        localStorage.setItem("TODO", JSON.stringify(LIST));
});