import { MatSidenavModule } from '@angular/material/sidenav';
import { DeleteModule } from './../../../directives/admin/delete.directive.module';
import { FileUploadModule } from './../../../services/common/file-upload/file-upload.module';
import { DialogModule } from './../../../dialogs/dialog.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';



@NgModule({
  declarations: [
    RoleComponent,
    ListComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: RoleComponent },
      {path:'create',component:CreateComponent}
    ]),
    
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    DialogModule,
    FileUploadModule,
    DeleteModule,
    MatSidenavModule
  ]
})
export class RoleModule { }
