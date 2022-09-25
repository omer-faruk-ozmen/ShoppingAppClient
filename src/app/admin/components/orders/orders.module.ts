import { DeleteModule } from '../../../directives/admin/delete.directive.module';
import { DeleteDirective } from './../../../directives/admin/delete.directive';
import { DialogModule } from './../../../dialogs/dialog.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [OrdersComponent, ListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: OrdersComponent }]),
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    DialogModule,
    DeleteModule
  ],
})
export class OrdersModule {}
