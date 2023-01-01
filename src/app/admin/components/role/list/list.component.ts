import { MatBadgeModule } from '@angular/material/badge';
import { List_Role } from './../../../../contracts/role/list_role';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from './../../../../services/common/dialog/dialog.service';
import {
  AlertifyService,
  MessageType,
  Position,
} from './../../../../services/admin/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { RoleService } from './../../../../services/common/models/role.service';
import { BaseComponent, SpinnerType } from './../../../../base/base.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(
    private roleService: RoleService,
    spinner: NgxSpinnerService,
    private alertifyService: AlertifyService
  ) {
    super(spinner);
  }

  displayedColumns: string[] = ['name', 'editing', 'delete'];
  dataSource: MatTableDataSource<List_Role> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;


  async getRoles() {
    this.showSpinner(SpinnerType.BallAtom);
    const allRoles: { datas:List_Role[] } =
      await this.roleService.getRoles(
        this.paginator ? this.paginator.pageIndex : 0,
        this.paginator ? this.paginator.pageSize : 5,
        () => this.hideSpinner(SpinnerType.BallAtom),
        (errorMessage) =>
          this.alertifyService.message(errorMessage, {
            dismissOthers: true,
            messageType: MessageType.Error,
            position: Position.TopRight,
          })
      );

  

    this.dataSource = new MatTableDataSource<List_Role>(allRoles.datas);
    this.paginator.length = allRoles.datas.length;
    console.log(this.dataSource)
  }

  async pageChanged() {
    await this.getRoles();
  }

  
  async ngOnInit() {
    await this.getRoles();
  }
}
