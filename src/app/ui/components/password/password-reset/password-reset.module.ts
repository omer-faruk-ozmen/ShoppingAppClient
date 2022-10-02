import { RouterModule } from '@angular/router';
import { PasswordResetComponent } from './password-reset.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    PasswordResetComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path:"",component:PasswordResetComponent
    }])
  ]
})
export class PasswordResetModule { }
