import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rightsidenav',
  templateUrl: './rightsidenav.component.html',
  styleUrls: ['./rightsidenav.component.scss']
})
export class RightsidenavComponent implements OnInit {

  activeSubtask;
  rightSideToggleStatus: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  createStep(stepInput) {
    var stepInputText = stepInput.value.trim();
    if(stepInputText !== "") {
      var step = {stepName: stepInputText, id: Date.now(), checked:false };
      this.activeSubtask.steps.push(step);
      //this.displayTask(task);
      //console.log(tasks);
      stepInput.value = '';
    } else {
      stepInput.focus();
    }
  }

  displaySteps(subTask) {
    this.activeSubtask = subTask;
    console.log("inside right nav", this.activeSubtask);
    this.rightSideToggleStatus = true;
  }

  checkedSubtask() {
    this.activeSubtask.checked = !this.activeSubtask.checked;
  }

}