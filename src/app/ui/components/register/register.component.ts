import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from './../../../base/base.component';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from './../../../services/ui/custom-toastr.service';
import { Create_User } from './../../../contracts/users/create_user';
import { UserService } from './../../../services/common/models/user.service';
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
export class RegisterComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: CustomToastrService
  ) {
    super(spinner);
  }

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

  async onSubmit(user: User) {
    this.submitted = true;

    if (this.form.invalid) return;

    const result: Create_User = await this.userService.create(user);

    if (result.succeeded) {
      this.toastrService.message(result.message, 'User Successfully Created', {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight,
      });
    } else {
      this.toastrService.message(result.message, 'Error', {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopRight,
      });
    }
  }
}
