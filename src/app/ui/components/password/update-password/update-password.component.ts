import { DashboardModule } from './../../../../admin/components/dashboard/dashboard.module';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from './../../../../services/common/models/user.service';
import { AlertifyOptions, AlertifyService, MessageType, Position } from './../../../../services/admin/alertify.service';
import { async } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from './../../../../base/base.component';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent extends BaseComponent implements OnInit {

  constructor(
    spinner:NgxSpinnerService,
    private userAuthService:UserAuthService,
    private activatedRoute:ActivatedRoute,
    private alertifyService:AlertifyService,
    private userService:UserService,
    private router:Router) 
    { super(spinner)}

    state:any=false;

    ngOnInit(): void {
      this.showSpinner(SpinnerType.BallAtom)
      this.activatedRoute.params.subscribe({
        next: async params => {
          const userId: string = params["userId"];
          const resetToken: string = params["resetToken"];
          this.state = await this.userAuthService.verifyResetToken(resetToken, userId, () => {
            this.hideSpinner(SpinnerType.BallAtom);
          })
        }
      });
    }
  
    updatePassword(password: string, passwordConfirm: string) {
      this.showSpinner(SpinnerType.BallAtom);
      if (password != passwordConfirm) {
        this.alertifyService.message("Passwords do not match!", {
          messageType: MessageType.Error,
          position: Position.TopRight
        });
        this.hideSpinner(SpinnerType.BallAtom)
        return;
      }
  
      this.activatedRoute.params.subscribe({
        next: async params => {
          const userId: string = params["userId"];
          const resetToken: string = params["resetToken"];
          await this.userService.updatePassword(userId, resetToken, password, passwordConfirm,
            () => {
              this.alertifyService.message("Password updated successfully", {
                messageType: MessageType.Success,
                position: Position.TopRight
              })
              this.router.navigate(["/login"])
            },
            error => {
              console.log(error)
            });
          this.hideSpinner(SpinnerType.BallAtom)
        }
      })
    


  }

}
