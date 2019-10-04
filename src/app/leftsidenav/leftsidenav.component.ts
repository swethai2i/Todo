import { Component, OnInit, Input } from '@angular/core';
import { tasks } from '../tasks';
import { CenterContentComponent } from '../center-content/center-content.component';

@Component({
  selector: 'app-leftsidenav',
  templateUrl: './leftsidenav.component.html',
  styleUrls: ['./leftsidenav.component.scss']
})
export class LeftsidenavComponent implements OnInit {
  status : boolean = false;
  tasks = tasks;
  @Input() middleContainer : CenterContentComponent;
  
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
      this.displayTask(task);
      console.log(tasks);
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

displayTask(task) {
  this.middleContainer.displaySubtask(task);
}

}