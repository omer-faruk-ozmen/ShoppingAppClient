import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from './../../../services/ui/custom-toastr.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from './../../../base/base.component';
import { UserService } from './../../../services/common/models/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseComponent implements OnInit {
  constructor(
    private userService: UserService,
    spinner: NgxSpinnerService,
    private toastrService: CustomToastrService
  ) {
    super(spinner);
  }

  ngOnInit(): void {}

  async login(usernameOrEmail: string, password: string) {
    this.showSpinner(SpinnerType.BallRunningDots);
    try {
      await this.userService.login(usernameOrEmail, password, () =>
        this.hideSpinner(SpinnerType.BallRunningDots)
      );
    } catch {
      this.toastrService.message('Username or password is wrong', 'Error', {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopRight,
      });
    }
  }
}
