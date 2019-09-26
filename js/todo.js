var activeTask;
var activeSubtask;
var activeStep;
var toDoList = [];

/**
 * To get element based on id for each element
 * @param {*} elementId 
 */
function getElementById(elementId) {
    return document.getElementById(elementId);
}

/**
 * To get element based on classname for each element
 * @param {*} elementClass 
 */
function getElementsByClassName(elementClass) {
    return document.getElementsByClassName(elementClass);
}

/**
 * To toggle left side navigator
 */
var navigatorButton = getElementById("navigator");
var slideToDoContent = getElementsByClassName("todo-list"); 
var hideText = getElementsByClassName("sidenav-item");
getElementById("navigator").addEventListener("click", function() {
  if (navigatorButton.getAttribute("aria-pressed") === "true") {
      getElementById("mySidenav").style.width = "19%";
      for(var i = 0; i < slideToDoContent.length; i++) {
          slideToDoContent[i].style.marginLeft = "288px";
      }
      for(var i = 0; i < hideText.length; i++) {
          hideText[i].style.display = "inline-block"; 
      }
      navigatorButton.setAttribute("aria-pressed", "false");
  } else {
      getElementById("mySidenav").style.width = "3.2%";
      for(var i = 0; i < slideToDoContent.length; i++) {
          slideToDoContent[i].style.marginLeft = "47px"; 
      }
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
    document.getElementById("icon").setAttribute("class", "subtask-icon-circle");
});

document.getElementById("subtask-input").addEventListener("focusout", function(){
    document.getElementById("icon").setAttribute("class", "subtask-icon")
});


/* if new list is to be added using ENTER button */
document.getElementById("new-item").addEventListener("keyup", function(event) {
var input = document.getElementById("new-item");
var inputText = input.value.trim();
  if (event.keyCode === 13 && inputText !== "") {
      event.preventDefault();
      document.getElementById("list-of-subtask").innerHTML = "";
      document.getElementById("toggle-right").style.display = "none";
      findDuplicateTaskName(inputText);
      input.value = "";
  } else {
      input.focus();
  }
});

/**
 * To find the task name to be unique by checking the task names present
 * @param {*} inputText 
 */
function findDuplicateTaskName(inputText) {
    const duplicateTask = toDoList.filter(function(task) {
          if(task.taskname.includes("(")) {
             var endindex = task.taskname.indexOf("(");
             var properinput = task.taskname.substr(0, endindex);
             return properinput == inputText;
         } else {
             return task.taskname == inputText;
         }
    });
    const duplicateSize = duplicateTask.length;
    if (duplicateSize == 0) {
        createTaskObject(inputText);
    } else {
        createTaskObject(inputText +"(" + duplicateSize + ")");
    }
}

/**
 * To create new task object
 * @param {*} inputText 
 */
function createTaskObject (inputText) {
    var todo = {taskname: inputText, id: Date.now(), isDeleted: false, subTasks: subTasks = []};
    var id = todo.id;
    activeTask = todo;
    toDoList.push(todo);
    document.getElementById("content-list").textContent = inputText;
    addTaskStyle(inputText, id);
}

/**
 * To add style to each task
 * @param {*} inputText 
 * @param {*} id 
 */
function addTaskStyle (inputText, id) {
    var taskList = document.createElement("div");
    taskList.setAttribute("id", id);
    taskList.setAttribute("class", "text");
    var taskIcon = document.createElement("div");
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

/**
 * To fetch the task name by using click event and displaying the name
 * @param {*} id 
 */
function findTaskUsingId(id) {
    document.getElementById(id).addEventListener("click", function(event) {
       var targetId = event.target.id;
       activeTask = toDoList.find(function(taskEvent) {
           return taskEvent.id == targetId;
       });
    document.getElementById("content-list").innerHTML = "" + activeTask.taskname + "";
    displaySubtasks(activeTask);
});
}


/**
 * To display the subtask for each task 
 * @param {*} activeTask 
 */
function displaySubtasks(activeTask) {
    document.getElementById("list-of-subtask").innerHTML = "";
    document.getElementById("toggle-right").style.display = "none";
    var showSubtask = activeTask.subTasks;
    for(var i = 0; i < showSubtask.length; i++) {
       //console.log("currentsubtask-----", showSubtask[i].checked);
       if (showSubtask[i].checked == "false") {
           addSubtaskStyle(showSubtask[i].subtaskName, showSubtask[i].id);
       } else {
           checkedSubtaskStyle(showSubtask[i].subtaskName, showSubtask[i].id);
       }
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

/**
 * To create subtask object for each task
 * @param {*} subtaskInputText 
 */
function createSubtask (subtaskInputText) {
    var subtaskTodo = {id: Date.now(), subtaskName: subtaskInputText, checked:"false", steps:steps=[]};
    var subtaskId = subtaskTodo.id;
    activeTask.subTasks.push(subtaskTodo);
    addSubtaskStyle(subtaskInputText, subtaskId);
}

/**
 * To add style to each subtask object
 * @param {*} subtaskInputText 
 * @param {*} subtaskId 
 */
function addSubtaskStyle (subtaskInputText, subtaskId) {
   var subtaskList = document.createElement("div");
   subtaskList.setAttribute("class", "subtask-container");
   subtaskList.setAttribute("id", subtaskId);
   var subtaskIcon = document.createElement("div");
   subtaskIcon.setAttribute("class", "dynamic-subtask-icon");
   subtaskIcon.setAttribute("id", subtaskId);
   var subtaskName = document.createElement("div");
   subtaskName.setAttribute("class", "subtask-text");
   subtaskName.setAttribute("id", subtaskId);
   var subtasktextNode = document.createTextNode(subtaskInputText);
   subtaskName.appendChild(subtasktextNode);
   subtaskList.appendChild(subtaskIcon);
   subtaskList.appendChild(subtaskName);
   var subtaskElement = document.getElementById("list-of-subtask");
   subtaskElement.appendChild(subtaskList);
   findSubtaskUsingId(subtaskId, subtaskIcon, subtaskName);
}

/**
 * 
 * @param {*} subtaskInputText 
 * @param {*} subtaskId 
 */
function checkedSubtaskStyle(subtaskInputText, subtaskId) {
    var subtaskList = document.createElement("div");
   subtaskList.setAttribute("class", "subtask-container");
   subtaskList.setAttribute("id", subtaskId);
   var subtaskIcon = document.createElement("div");
   subtaskIcon.setAttribute("class", "dynamic-unchecked-subtask-icon");
   subtaskIcon.setAttribute("id", subtaskId);
   var subtaskName = document.createElement("div");
   subtaskName.setAttribute("class", "subtask-text");
   subtaskName.setAttribute("id", subtaskId);
   subtaskName.style.textDecoration = 'line-through';
   var subtasktextNode = document.createTextNode(subtaskInputText);
   subtaskName.appendChild(subtasktextNode);
   subtaskList.appendChild(subtaskIcon);
   subtaskList.appendChild(subtaskName);
   var subtaskElement = document.getElementById("list-of-subtask");
   subtaskElement.appendChild(subtaskList);
   findSubtaskUsingId(subtaskId, subtaskIcon, subtaskName);
}

/**
 * To find the subtask id while clicking the subtask inside content
 * @param {*} subtaskId 
 * @param {*} subtaskIcon 
 * @param {*} subtaskName 
 */
function findSubtaskUsingId(subtaskId, subtaskIcon, subtaskName) {
    document.getElementById(subtaskId).addEventListener("click", function(event) {
    var targetId = event.target.id;
        activeSubtask = activeTask.subTasks.find(function(subtaskEvent) {
            return subtaskEvent.id == targetId;
        });
        console.log("======inside find subtask using id====", event.target.className);
        if ("dynamic-subtask-icon" === event.target.className) {
            checkedSubtask(activeSubtask, subtaskIcon, subtaskName);
        } else if ("dynamic-unchecked-subtask-icon" === event.target.className) {
            console.log("Inside dynamic-unchecked-subtask-icon-- else if");
            uncheckedSubtask(activeSubtask, subtaskIcon, subtaskName);
        } else {
            console.log("Inside dynamic-unchecked-subtask-icon--- else");
            if (activeSubtask.checked == "false") {
                document.getElementById("circle-icon").setAttribute("class","dynamic-subtask-icon");
                document.getElementById("subtask-heading").style.textDecoration = 'none';
                document.getElementById("subtask-heading").innerHTML = "" + activeSubtask.subtaskName + "";
                displaySteps(activeSubtask);
            } else {
                document.getElementById("circle-icon").setAttribute("class", "dynamic-unchecked-subtask-icon");
                document.getElementById("subtask-heading").style.textDecoration = 'line-through';
                document.getElementById("subtask-heading").innerHTML = "" + activeSubtask.subtaskName + "";
                displaySteps(activeSubtask);
            }
        }
    });
}

/**
 * To check the subtask checked status and toggle the operation based on the class name
 * @param {*} activeSubtask 
 * @param {*} subtaskIcon 
 * @param {*} subtaskName 
 */
function checkedSubtask (activeSubtask, subtaskIcon, subtaskName) {
    if (activeSubtask.checked == "false") {
        console.log("======inside checkedsubtask --- if ====");
        subtaskIcon.setAttribute("class", "dynamic-unchecked-subtask-icon");
        subtaskName.style.textDecoration = 'line-through';
        activeSubtask.checked = "true";
        document.getElementById("circle-icon").setAttribute("class", "dynamic-unchecked-subtask-icon");
        document.getElementById("subtask-heading").innerHTML = "" + activeSubtask.subtaskName + "";
        document.getElementById("subtask-heading").style.textDecoration = 'line-through';
        displaySteps(activeSubtask);
    } else {
        console.log("======inside checkedsubtask -- else ====");
        subtaskIcon.setAttribute("class","dynamic-subtask-icon");
        subtaskName.style.textDecoration = 'none';
        activeSubtask.checked = "false";
        document.getElementById("circle-icon").setAttribute("class","dynamic-subtask-icon");
        document.getElementById("subtask-heading").innerHTML = "" + activeSubtask.subtaskName + "";
        document.getElementById("subtask-heading").style.textDecoration = 'none';
        displaySteps(activeSubtask);
    }
}

/**
 * To check the subtask checked status and toggle the operation based on the class name
 * @param {*} activeSubtask 
 * @param {*} subtaskIcon 
 * @param {*} subtaskName 
 */
function uncheckedSubtask (activeSubtask, subtaskIcon, subtaskName) {
    if (activeSubtask.checked == "true") {
        console.log("======inside uncheckedSubtask --- if ====");
        subtaskIcon.setAttribute("class","dynamic-subtask-icon");
        subtaskName.style.textDecoration = 'none';
        activeSubtask.checked = "false";
        document.getElementById("circle-icon").setAttribute("class","dynamic-subtask-icon");
        document.getElementById("subtask-heading").innerHTML = "" + activeSubtask.subtaskName + "";
        document.getElementById("subtask-heading").style.textDecoration = 'none';
        displaySteps(activeSubtask);
    } else {
        console.log("======inside uncheckedSubtask --- else ====");
        subtaskIcon.setAttribute("class", "dynamic-unchecked-subtask-icon");
        subtaskName.style.textDecoration = 'line-through';
        activeSubtask.checked = "true";
        document.getElementById("circle-icon").setAttribute("class", "dynamic-unchecked-subtask-icon");
        document.getElementById("subtask-heading").innerHTML = "" + activeSubtask.subtaskName + "";
        document.getElementById("subtask-heading").style.textDecoration = 'line-through';
        displaySteps(activeSubtask);
    }
}


/* To find the subtask id while clicking the steps heading */
document.getElementById("circle-icon").addEventListener("click", function(event) {
    console.log("======inside clicking stepheading====", event.target.className);
    if ("dynamic-subtask-icon" === event.target.className) {
        if (activeSubtask.checked == "false") {
            console.log("======inside clicking stepheading --- if ====");
            document.getElementById(activeSubtask.id).getElementsByClassName("dynamic-subtask-icon")[0].setAttribute("class", "dynamic-unchecked-subtask-icon");
            document.getElementById(activeSubtask.id).getElementsByClassName("subtask-text")[0].style.textDecoration = "line-through";
            activeSubtask.checked = "true";
            document.getElementById("circle-icon").setAttribute("class", "dynamic-unchecked-subtask-icon");
            document.getElementById("subtask-heading").innerHTML = "" + activeSubtask.subtaskName + "";
            document.getElementById("subtask-heading").style.textDecoration = 'line-through';
        } else {
            console.log("======inside clicking stepheading --- else ====");
            document.getElementById(activeSubtask.id).getElementsByClassName("dynamic-unchecked-subtask-icon")[0].setAttribute("class","dynamic-subtask-icon");
            document.getElementById(activeSubtask.id).getElementsByClassName("subtask-text")[0].style.textDecoration = "none";
            activeSubtask.checked = "false";
            document.getElementById("circle-icon").setAttribute("class","dynamic-subtask-icon");
            document.getElementById("subtask-heading").innerHTML = "" + activeSubtask.subtaskName + "";
            document.getElementById("subtask-heading").style.textDecoration = 'none';
        }
    } else if ("dynamic-unchecked-subtask-icon" === event.target.className) {
        if (activeSubtask.checked == "false") {
            console.log("======inside clicking stepheading --- if ====");
            document.getElementById(activeSubtask.id).getElementsByClassName("dynamic-subtask-icon")[0].setAttribute("class", "dynamic-unchecked-subtask-icon");
            document.getElementById(activeSubtask.id).getElementsByClassName("subtask-text")[0].style.textDecoration = "line-through";
            activeSubtask.checked = "true";
            document.getElementById("circle-icon").setAttribute("class", "dynamic-unchecked-subtask-icon");
            document.getElementById("subtask-heading").innerHTML = "" + activeSubtask.subtaskName + "";
            document.getElementById("subtask-heading").style.textDecoration = 'line-through';
        } else {
            console.log("======inside clicking stepheading --- else ====");
            document.getElementById(activeSubtask.id).getElementsByClassName("dynamic-unchecked-subtask-icon")[0].setAttribute("class","dynamic-subtask-icon");
            document.getElementById(activeSubtask.id).getElementsByClassName("subtask-text")[0].style.textDecoration = "none";
            activeSubtask.checked = "false";
            document.getElementById("circle-icon").setAttribute("class","dynamic-subtask-icon");
            document.getElementById("subtask-heading").innerHTML = "" + activeSubtask.subtaskName + "";
            document.getElementById("subtask-heading").style.textDecoration = 'none';
        }
    }
});


/**
 * To display the steps for each task
 * @param {*} activeSubtask 
 */
function displaySteps(activeSubtask) {
    document.getElementById("list-of-steps").innerHTML = "";
    var showSteps = activeSubtask.steps;
    for(var i = 0; i < showSteps.length; i++) {
       if (showSteps[i].checked == "false") {
           addStepsStyle(showSteps[i].stepsName, showSteps[i].id);
       } else {
           checkedStepsStyle(showSteps[i].stepsName, showSteps[i].id);
       }
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

/**
 * To create step object for each subtask
 * @param {*} stepsInputText 
 */
function createStep(stepsInputText) {
    var step = {id:Date.now(), checked:"false", stepsName:stepsInputText};
    var stepId = step.id;
    activeSubtask.steps.push(step);
    addStepsStyle(stepsInputText, stepId);
}

/**
 * To add style to each step while creating and displaying
 * @param {*} stepsInputText 
 * @param {*} stepId 
 */
function addStepsStyle (stepsInputText, stepId) {
   var stepList = document.createElement("div");
   stepList.setAttribute("class", "steps-container");
   stepList.setAttribute("id", stepId);
   var stepIcon = document.createElement("div");
   stepIcon.setAttribute("class", "dynamic-subtask-icon");
   stepIcon.setAttribute("id", stepId);
   var stepName = document.createElement("div");
   stepName.setAttribute("class", "subtask-text");
   stepName.setAttribute("id", stepId);
   var steptextNode = document.createTextNode(stepsInputText);
   stepName.appendChild(steptextNode);
   stepList.appendChild(stepIcon);
   stepList.appendChild(stepName);
   var stepElement = document.getElementById("list-of-steps");
   stepElement.appendChild(stepList);
   findStepUsingId(stepId, stepIcon, stepName);
}

/**
 * To check the step checked status and load the checked class
 * @param {*} stepsInputText 
 * @param {*} stepId 
 */
function checkedStepsStyle (stepsInputText, stepId) {
   var stepList = document.createElement("div");
   stepList.setAttribute("class", "steps-container");
   stepList.setAttribute("id", stepId);
   var stepIcon = document.createElement("div");
   stepIcon.setAttribute("class", "dynamic-unchecked-subtask-icon");
   stepIcon.setAttribute("id", stepId);
   var stepName = document.createElement("div");
   stepName.setAttribute("class", "subtask-text");
   stepName.setAttribute("id", stepId);
   stepName.style.textDecoration = 'line-through';
   var steptextNode = document.createTextNode(stepsInputText);
   stepName.appendChild(steptextNode);
   stepList.appendChild(stepIcon);
   stepList.appendChild(stepName);
   var stepElement = document.getElementById("list-of-steps");
   stepElement.appendChild(stepList);
   findStepUsingId(stepId, stepIcon, stepName);
}

/**
 * To find the step using id while clicking the step
 * @param {*} stepId 
 * @param {*} stepIcon 
 * @param {*} stepName 
 */
function findStepUsingId(stepId, stepIcon, stepName) {
    document.getElementById(stepId).addEventListener("click", function(event) {
    var targetId = event.target.id;
        activeStep = activeSubtask.steps.find(function(stepEvent) {
            return stepEvent.id == targetId;
        });
        //console.log("====inside step click===", activeStep);
        if ("dynamic-subtask-icon" === event.target.className) {
            checkedStep(activeStep, stepIcon, stepName);
        } else if ("dynamic-unchecked-subtask-icon" === event.target.className) {
            checkedStep(activeStep, stepIcon, stepName);
        }
    });
}

/**
 * To check the step status and toggle the text and icon
 * @param {*} activeStep 
 * @param {*} stepIcon 
 * @param {*} stepName 
 */
function checkedStep(activeStep, stepIcon, stepName) {
    if (activeStep.checked == "false") {
        stepIcon.setAttribute("class", "dynamic-unchecked-subtask-icon");
        stepName.style.textDecoration = 'line-through';
        activeStep.checked = "true";
    } else {
        stepIcon.setAttribute("class","dynamic-subtask-icon");
        stepName.style.textDecoration = 'none';
        activeStep.checked = "false";
    }
}

document.getElementById("subtask-heading").addEventListener("dblclick", function(event) {
    var stepHeading = document.getElementById("subtask-heading");
    stepHeading.contentEditable = "true";
    stepHeading.style.cssText = 'outline: none; border:1px solid black;';
    updateSubtaskHeading(stepHeading);
});

/**
 * To update the steps heading
 * @param {*} stepHeading 
 */
function updateSubtaskHeading(stepHeading) {
    stepHeading.addEventListener("keyup", function(event) {
    var stepHeadingInput = stepHeading.innerText;
      if (event.keyCode === 13 && stepHeadingInput !== "") {
          event.preventDefault();
          activeSubtask.subtaskName = "" + stepHeadingInput + "";
          document.getElementById(activeSubtask.id).getElementsByClassName("subtask-text")[0].innerHTML = "" + stepHeadingInput + "";
          displaySubtasks(activeTask);
          stepHeading.contentEditable = "false";
          stepHeading.style.cssText = 'outline: none; border:none;';
      } else {
          stepHeading.focus();
      }
    });
}
