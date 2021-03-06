import { Router } from '@angular/router';
import { Position } from './services/admin/alertify.service';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from './services/ui/custom-toastr.service';
import { AuthService } from './services/common/auth.service';
import { Component } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    public authService: AuthService,
    private toastrService: CustomToastrService,
    private router: Router
  ) {
    authService.identityCheck();
  }

  signOut() {
    localStorage.removeItem('accessToken');
    this.authService.identityCheck();
    this.router.navigate(['']);
    this.toastrService.message('Successfully Logged Out', 'Logged Out', {
      messageType: ToastrMessageType.Warning,
      position: ToastrPosition.TopRight,
    });
  }
}
