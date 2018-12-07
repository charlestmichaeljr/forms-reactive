import {Component, OnInit} from '@angular/core';
import {Form, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-reactive-exercise',
  templateUrl: './reactive-exercise.component.html',
  styleUrls: ['./reactive-exercise.component.css']
})
export class ReactiveExerciseComponent implements OnInit {

  projectForm: FormGroup;
  projectStatuses = ['Stable', 'Critical', 'Finished'];
  defaultStatus = 'Stable';
  forbiddenProjectNames = ['Test', 'test'];

  constructor() {
  }

  ngOnInit() {
    this.projectForm = new FormGroup({
      projectName: new FormControl(null, [
        Validators.required,
        this.forbiddenProjectName.bind(this)],
        [this.forbiddenProjectNameAsync]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      projectStatus: new FormControl(null)
    });
  }

  onSubmit() {
    console.log(this.projectForm.value);
  }

  forbiddenProjectName(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenProjectNames.indexOf(control.value) !== -1) {
      return {projectNameIsForbidden: true};
    }
    return null;
  }

  forbiddenProjectNameAsync(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'Protest') {
          resolve({asyncProjectNameIsForbidden: true});
        } else {
          resolve(null);
        }
      }, 2000);
    });
    return promise;
  }

}
