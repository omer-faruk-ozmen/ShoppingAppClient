import {
  AuthService,
  _isAuthenticated,
} from './../../services/common/auth.service';
import { SpinnerType } from './../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from './../../services/ui/custom-toastr.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
    private toastrService: CustomToastrService,
    private spinner: NgxSpinnerService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.spinner.show(SpinnerType.BallRunningDots);

    if (!_isAuthenticated) {
      this.toastrService.message('Please Login!', 'Unauthorized Action', {
        messageType: ToastrMessageType.Warning,
        position: ToastrPosition.TopRight,
      });
      this.router.navigate(['login'], {
        queryParams: { returnUrl: state.url },
      });
    }
    this.spinner.hide(SpinnerType.BallRunningDots);
    return true;
  }
}
