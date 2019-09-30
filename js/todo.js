'use strict';
var activeTask;
var activeSubtask;
var activeStep;
var toDoList = [];
var subTasks = [];
var steps = [];

initialEvents(defaultTask);

/**
 * It indicates the initials event to be called
 */
function initialEvents(defaultTask) {
    getElementById("navigator").addEventListener("click", toggleLeftNavigator);
    getElementById("list-of-subtask").addEventListener("click", openRightSideNav);
    getElementById("arrow").addEventListener("click", closeRightSideNav);
    getElementById("new-item").addEventListener("click", openLeftSideNav);
    getElementById("subtask-input").addEventListener("focus", changeIconToCircle);
    getElementById("subtask-input").addEventListener("focusout", changeIconToPlus);
    getElementById("new-item").addEventListener("keyup", getTaskInput);
    getElementById("subtask-input").addEventListener("keyup", getSubtaskInput);
    getElementById("circle-icon").addEventListener("click", toggleCircleIcon);
    getElementById("new-steps").addEventListener("keyup", getStepInput);
    getElementById("subtask-heading").addEventListener("dblclick", updateSubtask);
    getElementById("trashSubtask").addEventListener("click", deleteSubtask);
    defaultTask();
}

/**
 * It indicates the default task, in which subtasks can be added without choosing any task
 */
function defaultTask() {
    var defaultTodo = {taskname: "Tasks", id: "Tasks", subTasks: subTasks = []};
    var id = defaultTodo.id;
    activeTask = defaultTodo;
    toDoList.push(defaultTodo);
    getElementById("content-list").textContent = defaultTodo.taskname;
    findTaskUsingId(id);
}

/**
 * To get the present date in particular format
 * 
 * @return - it returns the present date
 */
function formatDate() {
    return Date.now();
}

/**
 * To get element based on id for each element
 * @param {*} elementId - it denotes the element id used to get the element
 */
function getElementById(elementId) {
    return document.getElementById(elementId);
}

/**
 * To get element based on classname for each element
 * @param {*} elementClass - it indicates the element class used to get the element
 */
function getElementsByClassName(elementClass) {
    return document.getElementsByClassName(elementClass);
}

/**
 * Function used to create any new element
 * @param {*} element - used to create a partiuclar element
 */
function createAnyElement(element) {
    return document.createElement(element);
}

/**
 * Function used to append child node to parent node
 * @param {*} parentNode - it is the parent node where child node will be appended.
 * @param {*} childNode - it is the child node which will be appended in the parent node.
 */
function appendChildToParent(parentNode, childNode) {
    parentNode.appendChild(childNode);
}

/**
 * To create a textnode for any element
 * @param {*} text - it denotes the text node to be appended
 */
function createTextNode(text) {
    return document.createTextNode(text);
}

/**
 * To set properties and class for any element
 * @param {*} element - denotes the element to which the properties are to be appended
 * @param {*} elementId - it indicates the id of the element to be set
 * @param {*} elementClass - indicates the class to be added to the element
 */
function setAttributeForElement(element, elementId, elementClass) {
    element.setAttribute("id", elementId);
    element.setAttribute("class", elementClass);
}

/**
 * To toggle left side navigator
 */
var navigatorButton = getElementById("navigator");
function toggleLeftNavigator() {
var slideToDoContent = getElementsByClassName("todo-list"); 
var hideText = getElementsByClassName("sidenav-item");
  if (navigatorButton.getAttribute("aria-pressed") === "true") {
    toggleNav(slideToDoContent, hideText, " sidenav sidenav-width-to-open", "todo-list marginLeft-value-to-slide", " sidenav-item inline-display", "false");
  } else {
    toggleNav(slideToDoContent, hideText, "sidenav sidenav-width-to-close", "todo-list marginLeft-value-to-hide", "sidenav-item none-display", "true");
   }
}

/**
 * To open and close the side navigation
 * @param {*} slideToDoContent - indicates the element to slide along with content
 * @param {*} hideText - element which has to hide while toggling
 * @param {*} widthValue - it is the width of the side navigation
 * @param {*} marginLeftValue - it is used to slide the content to left margin along with side navigation 
 * @param {*} displayStyle - it is used for the display property of paricular element
 * @param {*} roleStatus - it indicates the status of the navigator, which is used for toggling
 */
function toggleNav(slideToDoContent, hideText, widthValue, marginLeftValue, displayStyle, roleStatus) {
    getElementById("mySidenav").setAttribute("class", widthValue);
    getElementById("group-task").setAttribute("class", displayStyle);
      for(var i = 0; i < slideToDoContent.length; i++) {
          slideToDoContent[i].setAttribute("class", marginLeftValue);
      }
      for(var i = 0; i < hideText.length; i++) {
          hideText[i].setAttribute("class", displayStyle);
      }
      navigatorButton.setAttribute("aria-pressed", roleStatus);
}


/**
 * To open the right side navigation while clicking on the subtask
 */
function openRightSideNav() {
    getElementById("toggle-right").setAttribute("class", "right-sidenav block-display");
}

/**
 * To close the right side navigation while clicking on the arrow symbol
 */
function closeRightSideNav() {
    getElementById("toggle-right").setAttribute("class", "right-sidenav none-display");
}


/**
 * To open left side navigator while clicking task input box
 */
function openLeftSideNav(){
    var slideToDoContent = getElementsByClassName("todo-list");
    var hideText = getElementsByClassName("sidenav-item");
    toggleNav(slideToDoContent, hideText, " sidenav sidenav-width-to-open", "todo-list marginLeft-value-to-slide", " sidenav-item inline-display", "false");
}

/**
 * To change icon to circle while focus-in and changes to plus icon while focus
 */
function changeIconToCircle() {
    getElementById("icon").setAttribute("class", "subtask-icon-circle");
}
/**
 * To change the icon to plus while focusing out
 */
function changeIconToPlus() {
    getElementById("icon").setAttribute("class", "subtask-icon")
}


/**
 * To get task input value while enter key was pressed
 * @param {*} event - it is the event which is used for adding the task
 */
function getTaskInput(event) {
    var input = getElementById("new-item");
    var inputText = input.value.trim();
    if (event.keyCode === 13 && inputText !== "") {
        event.preventDefault();
        getElementById("list-of-subtask").innerHTML = "";
        getElementById("toggle-right").setAttribute("class", "right-sidenav none-display");
        findDuplicateTaskName(inputText);
        input.value = "";
    } else {
        input.focus();
    }
}

/**
 * To find the task name to be unique by checking the task names present
 * @param {*} inputText - input entered which is used for uniqueness validation
 */
function findDuplicateTaskName(inputText) {
    var duplicateTask = toDoList.filter(function(task) {
          if(task.taskname.includes("(")) {
             var endindex = task.taskname.indexOf("(");
             var properinput = task.taskname.substr(0, endindex);
             return properinput == inputText;
         } else {
             return task.taskname == inputText;
         }
    });
    var duplicateSize = duplicateTask.length;
    if (duplicateSize == 0) {
        createTaskObject(inputText);
    } else {
        createTaskObject(inputText +"(" + duplicateSize + ")");
    }
}

/**
 * To create new task object
 * @param {*} inputText - it is the task name, using which the task object was created.
 */
function createTaskObject (inputText) {
    var todo = {taskname: inputText, id: formatDate(), subTasks: subTasks = []};
    var id = todo.id;
    activeTask = todo;
    toDoList.push(todo);
    getElementById("content-list").textContent = inputText;
    addTaskStyle(inputText, id);
}

/**
 * To add style to each task while creating and displaying
 * @param {*} inputText - it is the input text which is appended on a particular node.
 * @param {*} id - It is used to add the task id to each task
 */
function addTaskStyle (inputText, id) {
    var taskList = createAnyElement("div");
    setAttributeForElement(taskList, id, "text");
    var taskIcon = createAnyElement("div");
    setAttributeForElement(taskIcon, id, "sidenav-list");
    var taskName = createAnyElement("div");
    setAttributeForElement(taskName, id, "sidenav-item inline-display");
    var textNode = createTextNode(inputText);
    appendChildToParent(taskName, textNode);
    appendChildToParent(taskList, taskIcon);
    appendChildToParent(taskList, taskName);
    var taskElement = getElementById("task-list");
    appendChildToParent(taskElement, taskList);
    findTaskUsingId(id);
}

/**
 * To fetch the task name by using click event and displaying the name
 * @param {*} id - id which is used to get the target id using click event
 */
function findTaskUsingId(id) {
    getElementById(id).addEventListener("click", function(event) {
       var targetId = event.target.id;
       activeTask = toDoList.find(function(taskEvent) {
           return taskEvent.id == targetId;
       });
    getElementById("content-list").innerHTML = "" + activeTask.taskname + "";
    displaySubtasks(activeTask);
});
}


/**
 * To display the subtask for each task 
 * @param {*} activeTask - it indicates the task which is selected
 */
function displaySubtasks(activeTask) {
    getElementById("list-of-subtask").innerHTML = "";
    getElementById("toggle-right").setAttribute("class", "right-sidenav none-display");
    var showSubtask = activeTask.subTasks;
    for(var i = 0; i < showSubtask.length; i++) {
        if (!showSubtask[i].isDeleted) {
            if (!showSubtask[i].checked) {
                addSubtaskStyle(showSubtask[i].subtaskName, showSubtask[i].id);
            } else {
                checkedSubtaskStyle(showSubtask[i].subtaskName, showSubtask[i].id);
            }
        }
    }
}


/**
 * If new subtask was added using ENTER button
 * @param {*} event - it is the keyboard event used to identify if the Enter button is pressed
 */
function getSubtaskInput(event) {
    var subtaskInput = getElementById("subtask-input");
    var subtaskInputText = subtaskInput.value.trim();
    if (event.keyCode === 13 && subtaskInputText !== "") {
        event.preventDefault();
        createSubtask(subtaskInputText);
        subtaskInput.value = "";
    } else {
        subtaskInput.focus();
    }
}

/**
 * To create subtask object for each task
 * @param {*} subtaskInputText - it is the subtask input used to create subtask object
 */
function createSubtask (subtaskInputText) {
    var subtaskTodo = {id: formatDate(), subtaskName: subtaskInputText, checked:false, isDeleted:false, steps:steps=[]};
    var subtaskId = subtaskTodo.id;
    activeTask.subTasks.push(subtaskTodo);
    addSubtaskStyle(subtaskInputText, subtaskId);
}

/**
 * To add style to each subtask object while creating and displaying.
 * @param {*} subtaskInputText - it is the subtask input text
 * @param {*} subtaskId - it is the subtask id which is added to each element
 */
function addSubtaskStyle (subtaskInputText, subtaskId) {
    console.log("clickkkkkkkkkk66666666");
    var subtaskList = createAnyElement("div");
    setAttributeForElement(subtaskList, subtaskId, "subtask-container");
    var subtaskIcon = createAnyElement("div");
    setAttributeForElement(subtaskIcon, subtaskId, "dynamic-subtask-icon");
    var subtaskName = createAnyElement("div");
    setAttributeForElement(subtaskName, subtaskId, "subtask-text");
    var subtasktextNode = createTextNode(subtaskInputText);
    appendChildToParent(subtaskName, subtasktextNode);
    appendChildToParent(subtaskList, subtaskIcon);
    appendChildToParent(subtaskList, subtaskName);
    var subtaskElement = getElementById("list-of-subtask");
    appendChildToParent(subtaskElement, subtaskList);
    findSubtaskUsingId(subtaskId, subtaskIcon, subtaskName);
}

/**
 * Method used to display the subtask text and icon by checking the check circle status.
 * It will be called if the check circle is checked. 
 * @param {*} subtaskInputText - it indicates the input text of subtask
 * @param {*} subtaskId - denotes the subtask id to be added
 */
function checkedSubtaskStyle(subtaskInputText, subtaskId) {
    console.log("clickkkkkkkkkk2322345554");
    var subtaskList = createAnyElement("div");
    setAttributeForElement(subtaskList, subtaskId, "subtask-container");
    var subtaskIcon = createAnyElement("div");
    setAttributeForElement(subtaskIcon, subtaskId, "dynamic-unchecked-subtask-icon");
    var subtaskName = createAnyElement("div");
    setAttributeForElement(subtaskName, subtaskId, "subtask-text text-linethrough");
    //subtaskName.style.textDecoration = 'line-through';
    var subtasktextNode = createTextNode(subtaskInputText);
    appendChildToParent(subtaskName, subtasktextNode);
    appendChildToParent(subtaskList, subtaskIcon);
    appendChildToParent(subtaskList, subtaskName);
    var subtaskElement = getElementById("list-of-subtask");
    appendChildToParent(subtaskElement, subtaskList);
    findSubtaskUsingId(subtaskId, subtaskIcon, subtaskName);
}

/**
 * To find the subtask id while clicking the subtask inside content
 * @param {*} subtaskId - it is the subtask id which is used to get the target id
 * @param {*} subtaskIcon - indicates the subtask icon element
 * @param {*} subtaskName - inidicates the subtask name
 */
function findSubtaskUsingId(subtaskId, subtaskIcon, subtaskName) {
    getElementById(subtaskId).addEventListener("click", function(event) {
    var targetId = event.target.id;
        activeSubtask = activeTask.subTasks.find(function(subtaskEvent) {
            return subtaskEvent.id == targetId;
        });
        if ("dynamic-subtask-icon" === event.target.className) {
            toggleContentCheckCircle(activeSubtask, subtaskIcon, subtaskName, "dynamic-unchecked-subtask-icon", "subtask-text text-linethrough", true);
        } else if ("dynamic-unchecked-subtask-icon" === event.target.className) {
            //console.log("Inside dynamic-unchecked-subtask-icon-- else if");
            toggleContentCheckCircle(activeSubtask, subtaskIcon, subtaskName, "dynamic-subtask-icon", "subtask-text text-none", false);
        } else {
            //console.log("Inside dynamic-unchecked-subtask-icon--- else");
            viewSubtask(activeSubtask);
        }
    });
}

/**
 * To toggle the subtask checkcircle based on the class name clicked by the user.
 * Both checking and unchecking of check circle happens based on the class name
 * and text parameter. It also changes the subtask checked status.
 * @param {*} activeSubtask - denotes the subtask which is selected
 * @param {*} subtaskIcon - subtask icon in which properties are added
 * @param {*} subtaskName - it is the subtask name in which property class can be added
 * @param {*} toggleClass - it is property which is used to check and uncheck the icon
 * @param {*} textStyle - it is property to be added to the sutask name
 * @param {*} subtaskStatus - indicates the status of subtask
 */
function toggleContentCheckCircle(activeSubtask, subtaskIcon, subtaskName, toggleClass, textStyle, subtaskStatus) {
   // console.log("======inside checkedsubtask --- if ====");
    subtaskIcon.setAttribute("class", toggleClass);
    subtaskName.setAttribute("class", textStyle);
    activeSubtask.checked = subtaskStatus;
    getElementById("circle-icon").setAttribute("class", toggleClass);
    getElementById("subtask-heading").innerHTML = "" + activeSubtask.subtaskName + "";
    getElementById("subtask-heading").setAttribute("class", textStyle);
    displaySteps(activeSubtask);
}

/**
 * It is used to show the check circle and text based on the subtask checked status
 * @param {*} activeSubtask - denotes the active subtask object
 */
function viewSubtask(activeSubtask) {
    if (!activeSubtask.checked) {
        styleSubtaskCheckcircle("dynamic-subtask-icon", "subtask-text text-none", activeSubtask);
    } else {
        styleSubtaskCheckcircle("dynamic-unchecked-subtask-icon", "subtask-text text-linethrough", activeSubtask);
    }
}

/**
 * It is used to change the icon and text based on the class name
 * @param {*} iconClass - indicates the property class which is added to icon
 * @param {*} textClass - denotes the class which is to be added to text
 * @param {*} activeSubtask - it indicates the selected subtask
 */
function styleSubtaskCheckcircle(iconClass, textClass, activeSubtask) {
    getElementById("circle-icon").setAttribute("class", iconClass);
    getElementById("subtask-heading").setAttribute("class", textClass);
    getElementById("subtask-heading").innerHTML = "" + activeSubtask.subtaskName + "";
    displaySteps(activeSubtask);
}



/**
 * To find the subtask id while clicking the steps heading
 * @param {*} event - it indicates the click event which is used to toggle the circle
 */
function toggleCircleIcon(event) {
   // console.log("======inside clicking stepheading====", event.target.className);
    if ("dynamic-subtask-icon" === event.target.className) {
        toggleStepsHeadingCheckCircle("dynamic-subtask-icon", "dynamic-unchecked-subtask-icon", "subtask-text text-linethrough", true);
    } else if ("dynamic-unchecked-subtask-icon" === event.target.className) {
        toggleStepsHeadingCheckCircle("dynamic-unchecked-subtask-icon", "dynamic-subtask-icon", "subtask-text text-none", false);
    }
}

/**
 * To toggle the check circle of steps heading based on class name 
 * @param {*} classNameToSelect - represents the class name of an element to select
 * @param {*} classNameToChange - it indicates the property of class to be added
 * @param {*} textStyle - represents the style added to the text
 * @param {*} subtaskStatus - denotes the status which is to be set to the subtask
 */
function toggleStepsHeadingCheckCircle(classNameToSelect, classNameToChange, textStyle, subtaskStatus) {
    //console.log("======inside clicking stepheading --- if ====");
    getElementById(activeSubtask.id).getElementsByClassName(classNameToSelect)[0].setAttribute("class", classNameToChange);
    getElementById(activeSubtask.id).getElementsByClassName("subtask-text")[0].setAttribute("class", textStyle);
    activeSubtask.checked = subtaskStatus;
    getElementById("circle-icon").setAttribute("class", classNameToChange);
    getElementById("subtask-heading").innerHTML = "" + activeSubtask.subtaskName + "";
    getElementById("subtask-heading").setAttribute("class", textStyle);
}

/**
 * To display the steps for each task
 * @param {*} activeSubtask - it denotes the active subtask from which the steps are displayed
 */
function displaySteps(activeSubtask) {
    getElementById("list-of-steps").innerHTML = "";
    var showSteps = activeSubtask.steps;
    for(var i = 0; i < showSteps.length; i++) {
       if (!showSteps[i].checked) {
           addStepsStyle(showSteps[i].stepsName, showSteps[i].id);
       } else {
           checkedStepsStyle(showSteps[i].stepsName, showSteps[i].id);
       }
    }
}


/**
 * If new steps was added using ENTER button
 * @param {*} event - it is the event by which identifies the enter key code
 */
function getStepInput(event) {
    var stepsInput = getElementById("new-steps");
    var stepsInputText = stepsInput.value.trim();
    if (event.keyCode === 13 && stepsInputText !== "") {
        event.preventDefault();
        createStep(stepsInputText);
        stepsInput.value = "";
    } else {
        stepsInput.focus();
    }
}

/**
 * To create step object for each subtask
 * @param {*} stepsInputText - input text of step to create an step object
 */
function createStep(stepsInputText) {
    var step = {id:formatDate(), checked:false, isDeleted:false, stepsName:stepsInputText};
    var stepId = step.id;
    activeSubtask.steps.push(step);
    addStepsStyle(stepsInputText, stepId);
}

/**
 * To add style to each step while creating and displaying
 * @param {*} stepsInputText - it indicates the input text of the step
 * @param {*} stepId - it is the step id to be added to each element
 */
function addStepsStyle (stepsInputText, stepId) {
   var stepList = createAnyElement("div");
   setAttributeForElement(stepList, stepId, "steps-container");
   var stepIcon = createAnyElement("div");
   setAttributeForElement(stepIcon, stepId, "dynamic-subtask-icon");
   var stepName = createAnyElement("div");
   setAttributeForElement(stepName, stepId, "subtask-text");
   var steptextNode = createTextNode(stepsInputText);
   appendChildToParent(stepName, steptextNode);
   appendChildToParent(stepList, stepIcon);
   appendChildToParent(stepList, stepName);
   var stepElement = getElementById("list-of-steps");
   appendChildToParent(stepElement, stepList);
   findStepUsingId(stepId, stepIcon, stepName);
}

/**
 * To check the step checked status and load the checked class
 * @param {*} stepsInputText - it indicates the input text of the step
 * @param {*} stepId - it is the step id to be added to each element
 */
function checkedStepsStyle (stepsInputText, stepId) {
    var stepList = createAnyElement("div");
    setAttributeForElement(stepList, stepId, "steps-container");
    var stepIcon = createAnyElement("div");
    setAttributeForElement(stepIcon, stepId, "dynamic-unchecked-subtask-icon");
    var stepName = createAnyElement("div");
    setAttributeForElement(stepName, stepId, "subtask-text text-linethrough");
   // stepName.style.textDecoration = 'line-through';
    var steptextNode = createTextNode(stepsInputText);
    appendChildToParent(stepName, steptextNode);
    appendChildToParent(stepList, stepIcon);
    appendChildToParent(stepList, stepName);
    var stepElement = getElementById("list-of-steps");
    appendChildToParent(stepElement, stepList);
    findStepUsingId(stepId, stepIcon, stepName);
}

/**
 * To find the step using id while clicking the step
 * @param {*} stepId - step id which is used to find the target id
 * @param {*} stepIcon - it is the icon of the step
 * @param {*} stepName - step name of target step
 */
function findStepUsingId(stepId, stepIcon, stepName) {
    getElementById(stepId).addEventListener("click", function(event) {
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
 * @param {*} activeStep - it is the active step
 * @param {*} stepIcon - indicates the icon of step to which the class was added
 * @param {*} stepName - indicates the step name to which properties are added
 */
function checkedStep(activeStep, stepIcon, stepName) {
    if (!activeStep.checked) {
        stepIcon.setAttribute("class", "dynamic-unchecked-subtask-icon");
        stepName.setAttribute("class", "subtask-text text-linethrough");
        activeStep.checked = true;
    } else {
        stepIcon.setAttribute("class","dynamic-subtask-icon");
        stepName.setAttribute("class", "subtask-text text-none");
        activeStep.checked = false;
    }
}

/**
 * On double click event, the element
 * @param {*} event - it listens to the double click event
 */
function updateSubtask(event) {
    var stepHeading = getElementById("subtask-heading");
    stepHeading.contentEditable = "true";
    stepHeading.setAttribute("class", "subtask-text update-active");
    updateSubtaskHeading(stepHeading);
}

/**
 * To update the steps heading
 * @param {*} stepHeading - it indicates the step heading element to which key up event is added
 */
function updateSubtaskHeading(stepHeading) {
    stepHeading.addEventListener("keyup", function(event) {
    var stepHeadingInput = stepHeading.innerText;
        if (event.keyCode === 13 && stepHeadingInput !== "") {
            event.preventDefault();
            activeSubtask.subtaskName = "" + stepHeadingInput + "";
            getElementById(activeSubtask.id).getElementsByClassName("subtask-text")[0].innerHTML = "" + stepHeadingInput + "";
            displaySubtasks(activeTask);
            stepHeading.contentEditable = "false";
            stepHeading.setAttribute("class", "subtask-text update-inactive");
        } else {
            stepHeading.focus();
        }
    });
}

/**
 * Method which is used to delete a subtask from the list of task
 */
function deleteSubtask() {
    var result = confirm("" + activeSubtask.subtaskName +" will be permanently deleted. You won't be able to undo this action. Do you want to delete ?");
    if (result) {
        activeSubtask.isDeleted = true;
        getElementById(activeSubtask.id).setAttribute("class", "none-display");
        getElementById("toggle-right").setAttribute("class", "right-sidenav none-display");
        displaySubtasks(activeTask);
        deleteSteps(activeSubtask);
    } else {
        activeSubtask.isDeleted = false;
  }
}


/**
 * Method used to change the status of steps inside the deleted subtask to true
 * @param {*} activeSubtask - it indicates the subtask to be deleted
 */
function deleteSteps(activeSubtask) {
    var stepsToDelete = activeSubtask.steps;
    for (var i = 0; i < stepsToDelete.length; i++) {
        stepsToDelete[i].isDeleted = true;
    }
}