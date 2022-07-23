import { async } from '@angular/core/testing';
import { TokenResponse } from './../../../contracts/token/tokenResponse';
import { HttpClientService } from './../../../services/common/http-client.service';
import { AuthService } from './../../../services/common/auth.service';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from './../../../services/ui/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from './../../../base/base.component';
import { UserService } from './../../../services/common/models/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseComponent implements OnInit {
  constructor(
    private userService: UserService,
    spinner: NgxSpinnerService,
    private toastrService: CustomToastrService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private socialAuthService: SocialAuthService,
    private httpClientService: HttpClientService
  ) {
    super(spinner);
    socialAuthService.authState.subscribe(async (user: SocialUser) => {
      this.showSpinner(SpinnerType.BallRunningDots);
      await userService.googleLogin(user, () => {
        authService.identityCheck();
        this.hideSpinner(SpinnerType.BallRunningDots);
      });
    });
  }

  ngOnInit(): void {}

  async login(usernameOrEmail: string, password: string) {
    this.showSpinner(SpinnerType.BallRunningDots);
    try {
      await this.userService.login(usernameOrEmail, password, () => {
        this.authService.identityCheck();

        this.activatedRoute.queryParams.subscribe((queryParams) => {
          const returnUrl: string = queryParams['returnUrl'];
          if (returnUrl) this.router.navigate([returnUrl]);
        });

        this.hideSpinner(SpinnerType.BallRunningDots);
      });
    } catch {
      this.toastrService.message('Username or password is wrong', 'Error', {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopRight,
      });
    }
  }
}
