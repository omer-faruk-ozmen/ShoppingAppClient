import { Menu } from './../../contracts/application-configurations/menu';
import { SpinnerType } from './../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthorizationEndpointService } from './../../services/common/models/authorization-endpoint.service';
import { List_Role } from './../../contracts/role/list_role';
import { RoleService } from './../../services/common/models/role.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseDialog } from './../base/base-dialog';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'app-authorize-menu-dialog',
  templateUrl: './authorize-menu-dialog.component.html',
  styleUrls: ['./authorize-menu-dialog.component.scss'],
})
export class AuthorizeMenuDialogComponent  extends BaseDialog<AuthorizeMenuDialogComponent> implements OnInit {
  roles: {datas:List_Role[],totalRoleCount:number};
  assignedRoles:string[]
  listRoles:{name:string,selected:boolean}[];
  constructor(
    dialogRef: MatDialogRef<AuthorizeMenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService:RoleService,
    private authorizationEndpointService:AuthorizationEndpointService,
    private spinner:NgxSpinnerService
  ) {
    super(dialogRef);
  }
  async ngOnInit() {
    

    this.assignedRoles= await this.authorizationEndpointService.getRolesToEndpoint(this.data.code,this.data.menuName); 
    this.roles=await this.roleService.getRoles(-1,-1);
 
      
    this.listRoles = this.roles.datas.map((r:any)=>{
      return{
        name:r.name,
        selected:(this.assignedRoles?.indexOf(r.name)>-1)
      }
    });
  
    
  }

  assignRoles(rolesComponent:MatSelectionList){
   const roles:string[]=  rolesComponent.selectedOptions.selected.map(o=>o._text.nativeElement.innerText)
    
   this.spinner.show(SpinnerType.BallRunningDots)
    this.authorizationEndpointService.assignRoleEndpoint(roles,this.data.code ,this.data.menuName,()=>{

      this.spinner.hide(SpinnerType.BallRunningDots)
    },error=>{

      this.spinner.hide(SpinnerType.BallRunningDots)
    })
  }
}

export enum AuthorizeMenuState {
  Yes,
  No,
}
