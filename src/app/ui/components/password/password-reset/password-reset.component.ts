import { AlertifyService, MessageType, Position } from './../../../../services/admin/alertify.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from './../../../../base/base.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent extends BaseComponent {

  constructor(spinner:NgxSpinnerService,
    private userAuthService:UserAuthService,
    private alertifyService:AlertifyService
    ) { super(spinner)}

  passwordReset(email:string){
    this.showSpinner(SpinnerType.BallRunningDots)
    this.userAuthService.passwordReset(email,()=>{
      this.hideSpinner(SpinnerType.BallRunningDots)
      this.alertifyService.message('Password reset link has been sent.',{
        messageType:MessageType.Notify,
        position:Position.BottomRight
      })
    })
  }

}
