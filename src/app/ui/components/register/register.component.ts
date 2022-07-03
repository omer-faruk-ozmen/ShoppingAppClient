import { User } from './../../../entites/user';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  form: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        firstName: [
          '',
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.minLength(2),
          ],
        ],
        lastName: [
          '',
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.minLength(2),
          ],
        ],
        username: [
          '',
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.minLength(3),
          ],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.minLength(7),
            Validators.email,
          ],
        ],
        password: ['', [Validators.required, Validators.minLength(8)]],
        passwordAgain: [''],
      },
      {
        validators: (group: AbstractControl): ValidationErrors | null => {
          let password = group.get('password').value;
          let passwordAgain = group.get('passwordAgain').value;

          return password === passwordAgain ? null : { notSame: true };
        },
      }
    );
  }

  get component() {
    return this.form.controls;
  }
  submitted: boolean = false;

  onSubmit(data: User) {
    this.submitted = true;

    if (this.form.invalid) return;
  }
}
