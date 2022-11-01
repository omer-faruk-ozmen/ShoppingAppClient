import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AuthorizeMenuComponent } from './authorize-menu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AuthorizeMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: AuthorizeMenuComponent }]),
    MatTreeModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class AuthorizeMenuModule { }
