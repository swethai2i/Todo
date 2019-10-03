import { Component, OnInit } from '@angular/core';
import { tasks } from '../tasks';

@Component({
  selector: 'app-leftsidenav',
  templateUrl: './leftsidenav.component.html',
  styleUrls: ['./leftsidenav.component.scss']
})
export class LeftsidenavComponent implements OnInit {
  status : boolean = false;
  tasks = tasks;
  
  constructor() {
  }

  ngOnInit() {
  }

  toggleLeftNavigator(){
    this.status = !this.status;
  }

  createTask(input) {
    var inputText = input.value.trim();
    if(inputText !== "") {
      var inputText = this.findDuplicateTaskName(inputText);
      var task = {taskname: inputText, id: Date.now(), subTasks: []};
      tasks.push(task);
      input.value = '';
    } else {
      input.focus();
    }
  }

/**
 * To find the task name to be unique by checking the task names present
 * @param {*} inputText - input entered which is used for uniqueness validation
 */
findDuplicateTaskName(inputText) {
    var duplicateTask = tasks.filter(function(task) {
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
    return inputText;
  } else {
    return (inputText +"(" + duplicateSize + ")");
  }
}
}