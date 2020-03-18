const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");

const input = document.getElementById("input");

const element = document.getElementById("element")

element.insertAdjacentHTML(position, text);

const list = document.getElementById("list");


const CHECK ="fa-check-circle";
const UNCHECK ="fa-circle-thin";
const LINE_THROUGH = "lineThrough";



function addToDo(toDo) {
    
    const text =   `<li id="item">
                        <i class="fa fa-circle-thin complete" job="complete"></i>
                        <p class="text"> ${toDo} </p>
                        <i class="fa fa-trash-o delete" job="complete"></i>
                    </li>`
    const position = "beforehand";
    list.insertAdjacentHTML(position, text);
}

addToDo("Buy Butter");
let LIST = [];

let id = 0;

LIST[{} ,{} , ...];

LIST[0] ->
{
    name : "Buy Butter",
    id : 0,
    done : false,
    trash :false
}

LIST[1] ->
{
    name : "Dark Chocolate",
    id : 1,
    done : true,
    trash :false
}

document.addEventListener("keyup",function(event){
    if(event.keycode == 13){
        const toDo = input.value;
        if(toDo){
                addToDo(toDo, id, false, false);
                LIST.push(
                        {name: toDo,
                        id: id,
                        done: false,
                        trash: false}
                );
                     input.value="";
                     id++;
        }
       }

});

