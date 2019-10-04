import { Component, OnInit, Input } from '@angular/core';
import { RightsidenavComponent } from '../rightsidenav/rightsidenav.component';

@Component({
  selector: 'app-center-content',
  templateUrl: './center-content.component.html',
  styleUrls: ['./center-content.component.scss']
})
export class CenterContentComponent implements OnInit {

  iconStatus:boolean = false;
  activeTask;
  @Input() rightSideNav: RightsidenavComponent;
  constructor() { }

  ngOnInit() {
  }

  createSubtask(subtaskInput) {
    var subtaskInputText = subtaskInput.value.trim();
    if(subtaskInputText !== "") {
      var subTask = {subtaskName: subtaskInputText, id: Date.now(), checked:false, steps: []};
      this.activeTask.subTasks.push(subTask);
     // this.viewSteps(subTask);
      console.log("hjjgjgjk", this.activeTask.subTasks);
      subtaskInput.value = '';
    } else {
      subtaskInput.focus();
    }
  }

  displaySubtask(task) {
    console.log("inside center content");
    this.activeTask = task;
    this.rightSideNav.rightSideToggleStatus = false;
  }

  viewSteps(subTask) {
    this.rightSideNav.displaySteps(subTask);
  }

  focusInPlus() {
    this.iconStatus = true;
  }

  focusOutPlus() {
    this.iconStatus = false;
  }

  checkedSubtask(subTask) {
    subTask.checked = !subTask.checked;
  }

}
