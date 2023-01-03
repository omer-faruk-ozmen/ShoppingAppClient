import { AuthorizeMenuDialogComponent } from './../../../dialogs/authorize-menu-dialog/authorize-menu-dialog.component';
import { DialogService } from './../../../services/common/dialog/dialog.service';
import { Menu } from './../../../contracts/application-configurations/menu';
import { ApplicationRoleService } from './../../../services/common/models/application-role.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from './../../../base/base.component';
import { Component, OnInit } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';

@Component({
  selector: 'app-authorize-menu',
  templateUrl: './authorize-menu.component.html',
  styleUrls: ['./authorize-menu.component.scss'],
})
export class AuthorizeMenuComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private applicationRoleService: ApplicationRoleService,
    private dialogService:DialogService
  ) {
    super(spinner);
  }

  async ngOnInit() {
    this.dataSource.data = await (
      await this.applicationRoleService.getAuthorizeDefinitionEndpoints()
    ).map((m) => {
      const treeMenu: TreeMenu = {
        name: m.name,
        actions: m.actions.map((a) => {
          const _treeMenu: TreeMenu = {
            name: a.definition,
            code: a.code,
            menuName:m.name
          };
          return _treeMenu;
        }),
      };
      return treeMenu;
    });
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    (menu: TreeMenu, level: number) => {
      return {
        expandable: menu.actions?.length > 0,
        name: menu.name,
        level: level,
        code:menu.code,
        menuName:menu.menuName
      };
    },
    (menu) => menu.level,
    (menu) => menu.expandable,
    (menu) => menu.actions
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;




  assignRole(code:string,name:string, menuName:string){
    this.dialogService.openDialog({
      
      componentType:AuthorizeMenuDialogComponent,
      data:{code,name,menuName},
      options:{
        width:"750px"
      },
      afterClosed:()=>{

      },
    })
  }
}

interface ExampleFlatNode {
  expandable?: boolean;
  name?: string;
  level?: number;
}

interface TreeMenu {
  name?: string;
  actions?: TreeMenu[];
  code?: string;
  menuName?:string;
}