import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  hobbies: FormArray;
  forbiddenUserNames = ['Chris', 'Anna'];

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null,
          [Validators.required, Validators.email],
          [this.forbiddenEmails]),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });

    // Track changes in form values
    // this.signupForm.valueChanges.subscribe((value) => {
    //  console.log(value);
    // });

    // Track changes in form status like Valid or Invalid
    this.signupForm.statusChanges.subscribe((formStatus) => {
      console.log(formStatus);
    });
    this.signupForm.setValue({
      userData: {
        username: 'Bozo',
        email: 'bozo@clowns.com'
      },
      gender: 'male',
      hobbies: []
    });
    this.signupForm.patchValue({
      gender: 'female',
      hobbies: []
    });
  }

  onSubmit() {
    console.log(this.signupForm.controls['gender'].value);
  }

  addHobby( ) {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  // Synchronous custom validator
  forbiddenNames(control: FormControl): {[s: string]: boolean} {
      if (this.forbiddenUserNames.indexOf(control.value) !== -1) {
          return {nameIsForbidden: true};
      }
      return null;
  }

  // Asynchronous custom validator
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
      const promise = new Promise<any>((resolve, reject) => {
        setTimeout(() => {
          if (control.value === 'test@test.com') {
            resolve({emailIsForbidden: true});
          } else {
            resolve(null);
          }
        },  1500);
      });
      return promise;
  }

}
