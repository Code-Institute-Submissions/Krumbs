// my list const
const listsContainer = document.querySelector('[data-lists]')
const newListForm = document.querySelector('[data-new-list-form]')
const newListInput = document.querySelector('[data-new-list-input]')
const dataDeleteListButton = document.querySelector('[data-delete-list-button]')

// recipie ingredients list const
const listDisplayContainer = document.querySelector('[data-list-display-container]')
const listTitleElement = document.querySelector('[data-list-title]')
const listCountElement = document.querySelector('[data-list-count]')
const tasksContainer = document.querySelector('[data-tasks]')
//pulling templaye from html to use in ingredients list
const taskTemplate = document.getElementById('task-template')

const LOCAL_STORAGE_LIST_KEY = 'task.lists'
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [] // get information from local store using key, then parse/ or give empty array
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId'
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY) // allows the selection of items in my list using id

// allows the selected item in my list to be highlight as currently selected 
listsContainer.addEventListener('click', e => {
  if (e.target.tagName.toLowerCase() === 'li') { // not currently seeing selection due to no css
    selectedListId = e.target.dataset.listId
    saveAndRender()
  }
})

dataDeleteListButton.addEventListener('click', e => {
  lists = lists.filter(list => list.id !== selectedListId)
  selectedListId = null
  saveAndRender()
})

// allows adding new item to My list
newListForm.addEventListener('submit', e => {
  e.preventDefault()
  const listName = newListInput.value
  if (listName == null || listName === '') return
  const list = createList(listName)
  //clear input when item added
  newListInput.value = null
  lists.push(list)
  saveAndRender() //saves the list
})

function createList(name) {
  return { id: Date.now().toString(), name: name, tasks: [] }
}

//allowing us to save the list to local storage
function saveAndRender() {
  save()
  render()
}
//allowing us to save the list to local storage
function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists)) 
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId) // saves id for selection
}


function render() {
    clearElement(listsContainer)
    renderLists()
    const selectedList = lists.find(list => list.id === selectedListId)
    if (selectedListId == null) {
    listDisplayContainer.style.display = 'none' // removes recipie list if deleted and nothing on my list selected
    } else {
    listDisplayContainer.style.display = ''
    listTitleElement.innerText = selectedList.name // changes title of recipie to selected name on my list
    renderTaskCount(selectedList)
    clearElement(tasksContainer)
    renderTasks(selectedList)
  }    

}
//
function renderTasks(selectedList) {
  selectedList.tasks.forEach(task => {
    const taskElement = document.importNode(taskTemplate.content, true)//clone the task template from html
    const checkbox = taskElement.querySelector('input')
    checkbox.id = task.id
    checkbox.checked = task.complete
    const label = taskElement.querySelector('label')
    label.htmlFor = task.id
    label.append(task.name)
    tasksContainer.appendChild(taskElement)
  })
}



// shows number of recipies still to get
function renderTaskCount(selectedList) {
    const incompleteTaskCount = selectedList.tasks.filter(task => !task.complete).length
    const taskString = incompleteTaskCount === 1 ? "task" : "tasks"
    listCountElement.innerText = `${incompleteTaskCount} ${taskString} remaining`
}


// set up my list so new item can be added on to end
function renderLists() {
    lists.forEach(list => {
        const listElement = document.createElement('li')
        listElement.dataset.listId = list.id
        listElement.classList.add(list-name)
        listElement.innerHTML = list.name
        if (list.id === selectedListId) {
        listElement.classList.add('active-list')
        }
        listsContainer.appendChild(listElement)
  })
}



function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

render()