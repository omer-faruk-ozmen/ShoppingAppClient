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

    const token: string = localStorage.getItem('accessToken');

    //const decodeToken = this.jwtHelper.decodeToken(token);
    //const expirationDate = this.jwtHelper.getTokenExpirationDate(token);
    let expired: boolean;
    try {
      expired = this.jwtHelper.isTokenExpired(token);
    } catch {
      expired = true;
    }
    console.log(state.url);

    if (!token || expired) {
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
