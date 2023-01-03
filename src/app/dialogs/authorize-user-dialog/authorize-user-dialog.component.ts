import { UserService } from 'src/app/services/common/models/user.service';
import { BaseDialog } from './../base/base-dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { RoleService } from 'src/app/services/common/models/role.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { SpinnerType } from 'src/app/base/base.component';
import { List_Role } from 'src/app/contracts/role/list_role';

@Component({
  selector: 'app-authorize-user-dialog',
  templateUrl: './authorize-user-dialog.component.html',
  styleUrls: ['./authorize-user-dialog.component.scss'],
})
export class AuthorizeUserDialogComponent
  extends BaseDialog<AuthorizeUserDialogComponent>
  implements OnInit
{
  roles: { datas: List_Role[]; totalRoleCount: number };
  assignedRoles: string[];
  listRoles: { name: string; selected: boolean }[];
  constructor(
    dialogRef: MatDialogRef<AuthorizeUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService: RoleService,
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) {
    super(dialogRef);
  }
  async ngOnInit() {
    this.assignedRoles = await this.userService.getRolesToUser(
      this.data,
      () => this.spinner.hide(SpinnerType.BallRunningDots),
      (error) => {}
    );
    this.roles = await this.roleService.getRoles(-1, -1);

    this.listRoles = this.roles.datas.map((r: any) => {
      return {
        name: r.name,
        selected: this.assignedRoles?.indexOf(r.name) > -1,
      };
    });
  }

  assignRoles(rolesComponent: MatSelectionList) {
    const roles: string[] = rolesComponent.selectedOptions.selected.map(
      (o) => o._text.nativeElement.innerText
    );

    this.spinner.show(SpinnerType.BallRunningDots);
    this.userService.assignRoleToUser(
      this.data,
      roles,
      () => {
        this.spinner.hide(SpinnerType.BallRunningDots);
      },
      (error) => {
        this.spinner.hide(SpinnerType.BallRunningDots);
      }
    );
  }
}
