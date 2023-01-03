import { AuthorizeUserDialogComponent } from './../../../../dialogs/authorize-user-dialog/authorize-user-dialog.component';
import { List_User } from './../../../../contracts/users/list_user';
import { MessageType } from './../../../../services/admin/alertify.service';
import { BaseComponent, SpinnerType } from './../../../../base/base.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog/dialog.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  
  constructor(
    private userService: UserService,
    spinner: NgxSpinnerService,
    private alertifyService: AlertifyService,
    private dialogService:DialogService
  ) {
    super(spinner);
  }

  displayedColumns: string[] = [
    "userName",
    "firstName",
    "lastName",
    "email",
    "twoFactorEnabled",
    "role",
    "delete"
  ];
  dataSource: MatTableDataSource<List_User> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  async ngOnInit() {
    await this.getUsers();
  }

  async getUsers() {
    this.showSpinner(SpinnerType.BallRunningDots);
    const allUsers: { totalUsersCount: number; users: List_User[] } =
      await this.userService.getAllUsers(
        this.paginator ? this.paginator.pageIndex : 0,
        this.paginator ? this.paginator.pageSize : 10,
        () => this.hideSpinner(SpinnerType.BallRunningDots),
        (errorMessage) => {
          this.alertifyService.message(errorMessage, {
            messageType: MessageType.Error,
            dismissOthers: true,
            position: Position.TopRight,
          });
        }
      );
    this.dataSource = new MatTableDataSource<List_User>(
      allUsers.users
      
    );
    this.paginator.length = allUsers.totalUsersCount;
  }

  assignRole(id:string){
    this.dialogService.openDialog({
      componentType:AuthorizeUserDialogComponent,
      data:id,
      options:{
        width:"750px"
      },
      afterClosed:()=>{

      }
    })
  }


  async pageChanged() {
    await this.getUsers();
  }

}
