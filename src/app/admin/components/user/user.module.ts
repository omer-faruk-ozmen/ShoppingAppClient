import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { DeleteModule } from './../../../directives/admin/delete.directive.module';
import { DialogModule } from './../../../dialogs/dialog.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { ListComponent } from './list/list.component';



@NgModule({
  declarations: [
    UserComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    DeleteModule,
    DialogModule,
    RouterModule.forChild([
      {path:"",component:UserComponent}
    ]),
    MatButtonModule
  ]
})
export class UserModule { }
