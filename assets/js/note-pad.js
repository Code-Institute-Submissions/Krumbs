const listsContainer = document.querySelector('[data-lists]')
const newListForm = document.querySelector('[data-new-list-form]')
const newListInput = document.querySelector('[data-new-list-input]')
const dataDeleteListButton = document.querySelector('[data-delete-list-button]')

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


// set up my list so new item can be added on to end
function render() {
    clearElement(listsContainer)
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