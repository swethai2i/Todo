var activeTask;
var activeSubtask;
var toDoList = [];

/* side  navigation bar toggle */
var navigatorButton = document.getElementById("navigator");
document.getElementById("navigator").addEventListener("click", function(){
  if (navigatorButton.getAttribute("aria-pressed") === "true") {
      document.getElementById("mySidenav").style.width = "19%";
      var slideToDoContent = document.getElementsByClassName("todo-list"); 
      for(var i = 0; i < slideToDoContent.length; i++) {
          slideToDoContent[i].style.marginLeft = "288px";
      }
      var hideText = document.getElementsByClassName("sidenav-item");
      for(var i = 0; i < hideText.length; i++) {
          hideText[i].style.display = "inline-block"; 
      }
      navigatorButton.setAttribute("aria-pressed", "false");
  } else {
      document.getElementById("mySidenav").style.width = "3.2%";
      var slideToDoContent = document.getElementsByClassName("todo-list"); 
      for(var i = 0; i < slideToDoContent.length; i++) {
          slideToDoContent[i].style.marginLeft = "47px"; 
      }
      var hideText = document.getElementsByClassName("sidenav-item");
      for(var i = 0; i < hideText.length; i++) {
          hideText[i].style.display = "none"; 
      }
      navigatorButton.setAttribute("aria-pressed", "true");
   }
});


/* rightside navigation toggle */
document.getElementById("list-of-subtask").addEventListener("click", function() {
    document.getElementById("toggle-right").style.display = "block";
});

document.getElementById("arrow").addEventListener("click", function() {
    document.getElementById("toggle-right").style.display = "none";
});


/* side navigation bar opens if new list is clicked */
document.getElementById("new-item").addEventListener("click", function(){
    document.getElementById("mySidenav").style.width = "19%";
      var slideToDoContent = document.getElementsByClassName("todo-list"); 
      for(var i = 0; i < slideToDoContent.length; i++) {
          slideToDoContent[i].style.marginLeft = "288px";
      }
      var hideText = document.getElementsByClassName("sidenav-item");
      for(var i = 0; i < hideText.length; i++) {
          hideText[i].style.display = "inline-block"; 
      }
      navigatorButton.setAttribute("aria-pressed", "false");
});

/* To change icon to circle while focus-in and changes to plus icon while focus */
document.getElementById("subtask-input").addEventListener("focus", function(){
    document.getElementById("icon").innerHTML = '<i class="fa fa-circle-thin"></i>';
});

document.getElementById("subtask-input").addEventListener("focusout", function(){
    document.getElementById("icon").innerHTML = '<i class="fa fa-plus" aria-hidden="true">';
});


/* if new list is to be added using ENTER button */
document.getElementById("new-item").addEventListener("keyup", function(event) {
var input = document.getElementById("new-item");
var inputText = input.value.trim();
  if (event.keyCode === 13 && inputText !== "") {
      event.preventDefault();
      document.getElementById("list-of-subtask").innerHTML = "";
      findDuplicateTaskName(inputText);
      input.value = "";
  } else {
      input.focus();
  }
});

/*
function validateInputText(input) {
   if(input.includes("(")) {
        var endindex = input.indexof("(");
        var properinput = input.substr(0,endindex);
        return properinput;
    } else {
        return input;
    }
}*/


function findDuplicateTaskName(inputText) {
    const duplicateTask = toDoList.filter(task => task.taskname == inputText);
    const duplicateSize = duplicateTask.length;
    if (duplicateSize == 0) {
        createTaskObject(inputText);
    } else {
        createTaskObject(inputText +"(" + duplicateSize + ")");
    }
}


function createTaskObject (inputText) {
    var todo = {taskname: inputText, checked: false, id: Date.now(), subTasks:subTasks = []};
    var id = todo.id;
    activeTask = todo;
    console.log("inside add to do", activeTask);
    toDoList.push(todo);
    document.getElementById("content-list").textContent = inputText;
    addTaskStyle(inputText, id);
}

/* To add list of todo */
function addTaskStyle (inputText, id) {
    var taskList = document.createElement("div");
    taskList.setAttribute("id", id);
    taskList.setAttribute("class", "text");
    var taskIcon = document.createElement("div");
    taskIcon.innerHTML = '<i class="fa fa-list-ul blue-icon"></i>';
    taskIcon.setAttribute("class", "sidenav-list");
    taskIcon.setAttribute("id", id);
    var taskName = document.createElement("div");
    taskName.setAttribute("class", "sidenav-item");
    taskName.setAttribute("id", id);
    taskName.style.display = "inline-block";
    var textNode = document.createTextNode(inputText);
    taskName.appendChild(textNode);
    taskList.appendChild(taskIcon);
    taskList.appendChild(taskName);
    var taskElement = document.getElementById("task-list");
    taskElement.append(taskList);
    findTaskUsingId(id);
}

/* To fetch the task name by using click event and displaying the name */
function findTaskUsingId(id) {
    document.getElementById(id).addEventListener("click", function(event) {
       var targetId = event.target.id;
       console.log("Inside listener", targetId);
       activeTask = toDoList.find(function(taskEvent) {
           return taskEvent.id == targetId;
       });
    document.getElementById("content-list").innerHTML = "" + activeTask.taskname + "";
    displaySubtasks(activeTask);
    console.log(activeTask);
});
}


/* To display the subtask for each task */
function displaySubtasks(activeTask) {
    document.getElementById("list-of-subtask").innerHTML = "";
    var showSubtask = activeTask.subTasks;
    for(var i = 0; i < showSubtask.length; i++) {
       // console.log("each element", showSubtask[i].subtaskList);
       addSubtaskStyle(showSubtask[i].subtaskName, showSubtask[i].id);
    }
}


/* if new subtask was added using ENTER button */
document.getElementById("subtask-input").addEventListener("keyup", function(event) {
var subtaskInput = document.getElementById("subtask-input");
var subtaskInputText = subtaskInput.value.trim();
  if (event.keyCode === 13 && subtaskInputText !== "") {
      event.preventDefault();
      createSubtask(subtaskInputText);
      subtaskInput.value = "";
  } else {
      subtaskInput.focus();
  }
});


function createSubtask (subtaskInputText) {
    var subtaskTodo = {id: Date.now(), subtaskName: subtaskInputText, checked:"false", steps:steps=[]};
    var subtaskId = subtaskTodo.id;
    activeTask.subTasks.push(subtaskTodo);
    console.log("Inside after adding subtask", activeTask);
    addSubtaskStyle(subtaskInputText, subtaskId);
}

/* To add subtask list for each task*/
function addSubtaskStyle (subtaskInputText, subtaskId) {
   var subtaskList = document.createElement("div");
   subtaskList.setAttribute("class", "subtask-container");
   subtaskList.setAttribute("id", subtaskId);
   var subtaskIcon = document.createElement("div");
   subtaskIcon.setAttribute("class", "subtask-icon");
   subtaskIcon.setAttribute("id", subtaskId);
   subtaskIcon.innerHTML = '<i class="fa fa-circle-thin"></i>';
   var subtaskName = document.createElement("div");
   subtaskName.setAttribute("class", "subtask-text");
   subtaskName.setAttribute("id", subtaskId);
   var subtasktextNode = document.createTextNode(subtaskInputText);
   subtaskName.appendChild(subtasktextNode);
   subtaskList.appendChild(subtaskIcon);
   subtaskList.appendChild(subtaskName);
   var subtaskElement = document.getElementById("list-of-subtask");
   subtaskElement.appendChild(subtaskList);
   findSubtaskUsingId(subtaskId);
}

/* To find the subtask id while clicking the subtask */
function findSubtaskUsingId(subtaskId) {
    document.getElementById(subtaskId).addEventListener("click", function(event) {
    var targetId = event.target.id;
        console.log("Inside listener", targetId);
        activeSubtask = activeTask.subTasks.find(function(subtaskEvent) {
            console.log("=================Inside subtask listener=================", activeSubtask);
            return subtaskEvent.id == targetId;
        });
    document.getElementById("subtask-heading").innerHTML = "" + activeSubtask.subtaskName + "";
    displaySteps(activeSubtask);
    });
}

/* To display the steps for each task */
function displaySteps(activeSubtask) {
    document.getElementById("list-of-steps").innerHTML = "";
    var showSteps = activeSubtask.steps;
    for(var i = 0; i < showSteps.length; i++) {
       // console.log("each element", showSubtask[i].subtaskList);
       addStepsStyle(showSteps[i].stepsName);
    }
}

/* if new steps was added using ENTER button */
document.getElementById("new-steps").addEventListener("keyup", function(event) {
var stepsInput = document.getElementById("new-steps");
var stepsInputText = stepsInput.value.trim();
  if (event.keyCode === 13 && stepsInputText !== "") {
      event.preventDefault();
      createStep(stepsInputText);
      stepsInput.value = "";
  } else {
      stepsInput.focus();
  }
});

function createStep(stepsInputText) {
    var step = {id:Date.now(), stepsName:stepsInputText};
    activeSubtask.steps.push(step);
    addStepsStyle(stepsInputText);
}

/* To add subtask list for each task*/
function addStepsStyle (stepsInputText) {
   var stepList = document.createElement("div");
   stepList.setAttribute("class", "steps-container");
   var stepIcon = document.createElement("div");
   stepIcon.setAttribute("class", "subtask-icon");
   stepIcon.innerHTML = '<i class="fa fa-circle-thin"></i>';
   var stepName = document.createElement("div");
   stepName.setAttribute("class", "subtask-text");
   var steptextNode = document.createTextNode(stepsInputText);
   stepName.appendChild(steptextNode);
   stepList.appendChild(stepIcon);
   stepList.appendChild(stepName);
   var stepElement = document.getElementById("list-of-steps");
   stepElement.appendChild(stepList);
}
