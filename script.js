const putTasksInDOM = async function () {

    // Getting all task data from the server
    let allTasks = await getAllData();

    // Grabbing the To-Do list
    let todoList = document.getElementsByClassName('todo_list')[0]; 

    // Clearing the DOM
    while(todoList.firstChild){
        todoList.removeChild(todoList.firstChild);
    }

    // Adding all current tasks to the DOM
    await allTasks.forEach((task) => {
        
        // Creating the list item and delete button HTML elements
        let todoItem = document.createElement('li');
        todoItem.setAttribute('class', 'todo_item')
        let deleteIcon = document.createElement('img');

        // Creating the task checkbox
        let taskDoneCheckbox = document.createElement('input');
        taskDoneCheckbox.setAttribute('type', 'checkbox')
        taskDoneCheckbox.setAttribute('class', 'todo_checkbox')
    
        // Putting the task content in the newly created list item
        let taskContent = document.createElement('p');
        taskContent.setAttribute('class', 'task_content')
        taskContent.innerText = task.desc;
        
        // Attaching the automatically generated task ID to the list item
        todoItem.dataset.itemid = task._id;
        
        // Setting and styling the delete icon image
        deleteIcon.setAttribute("src", "trash.png");
        deleteIcon.setAttribute("class", "delete_icon");

        // Attaching the text paragraph, checkbox, and delete icon to the task
        todoItem.appendChild(taskDoneCheckbox);
        todoItem.appendChild(taskContent);
        
        todoItem.appendChild(deleteIcon);
        
        // Attaching the task to the todo-list
        todoList.appendChild(todoItem);

        
        // Adding the event listener to the trash icon for deleting the task
        deleteIcon.addEventListener('click', deleteTask)

        // Adding the event listener to the checkbox for completing the task
        taskDoneCheckbox.addEventListener('click', completeTask)

        // Adding text editing event listener - probleem is dat ik nu twee keer moet klikken

        taskContent.setAttribute('contentEditable', 'true')
        taskContent.addEventListener('click', function() {
            taskContent.setAttribute('contentEditable', 'true')
            taskContent.classList.remove('taskedit')
        })

        // Adding text editing function

        
        taskContent.addEventListener('keypress', async function(event) {
            if(event.key === 'Enter') {

                event.preventDefault();
                
                let currentTask = event.target.parentNode;
                console.log("Currently Selected Task", currentTask)

                let currentTaskInput = event.target.innerText;
                console.log("Current Task Input", currentTaskInput)

                let currentTaskID = currentTask.dataset.itemid;
                console.log("Currently Selected Task ID", currentTaskID)

                let taskData = await getSpecificData(currentTaskID);
                console.log("Currently Selected Task Old Data", taskData)

                taskData.desc = currentTaskInput;

                console.log("currentTaskData after update:", taskData)

                // Now for the PUTing part
                await putData(currentTaskID, taskData)

                taskContent.setAttribute('contentEditable', 'false')
                // taskContent.classList.toggleClass('taskedit')

                taskContent.classList.add('taskedit')

                console.log(taskContent.classList[0])

            

                
            }
        })
    })
};

// Adding the 'task complete' (linethrough) function
let completeTask = function (event) {
    let targetTask = event.target.parentNode; 
    targetTask.classList.toggle('taskcomplete')
}

// Getting the new task input forms and submit button
let getNewTaskForm = document.getElementById("new_task_form")
let getTaskNameInput = Array.from(document.getElementsByClassName("task_input"));
let getTaskSubmit = Array.from(document.getElementsByClassName("submit_button"));

// Adding new task function
let addNewTask = function () { 
    let userInput = {desc: getTaskNameInput[0].value}
    postData(userInput);
}

// Adding submit button event listener
getTaskSubmit[0].addEventListener('click', addNewTask)

// Adding delete function
let deleteTask = async function (event) { 
    let taskToDeleteID = event.target.parentNode.dataset.itemid;
    await delSpecificData(taskToDeleteID);
    await putTasksInDOM();
}

// Initial loading of the DOM
putTasksInDOM();
