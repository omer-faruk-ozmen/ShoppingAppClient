import { Create_Role } from './../../../../contracts/role/create_role';
import { RoleService } from './../../../../services/common/models/role.service';
import { AlertifyService, MessageType, Position } from './../../../../services/admin/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from './../../../../base/base.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent {

  constructor(
    spinner: NgxSpinnerService,
    private roleService: RoleService,
    private alertify: AlertifyService
  ) {
    super(spinner);
  }

  create(
    name: HTMLInputElement
  ) {
    this.showSpinner(SpinnerType.BallRunningDots);
    const create_role: Create_Role = new Create_Role();

    create_role.name = name.value;

    if (!name.value) {
      this.alertify.message('Name is required', {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight,
      });
      return;
    }

    this.roleService.create(
      name.value,
      () => {
        this.hideSpinner(SpinnerType.BallRunningDots);
        this.alertify.message('Role add success.', {
          dismissOthers: true,
          messageType: MessageType.Success,
          position:Position.TopRight
        });
      },
      (errorMessage) => {
        this.alertify.message(errorMessage, {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight,
        });
      }
    );
  }
}
