import { QrcodeDialogComponent } from './../../../../dialogs/qrcode-dialog/qrcode-dialog.component';
import { SelectProductImageDialogComponent } from './../../../../dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { DialogService } from './../../../../services/common/dialog/dialog.service';
import {
  AlertifyService,
  MessageType,
  Position,
} from './../../../../services/admin/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from './../../../../base/base.component';
import { ProductService } from './../../../../services/common/models/product.service';
import { List_Product } from './../../../../contracts/list_product';
import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatTableDataSource,
  _MatTableDataSource,
} from '@angular/material/table';

declare var $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(
    private productService: ProductService,
    spinner: NgxSpinnerService,
    private alertifyService: AlertifyService,
    private dialogService: DialogService
  ) {
    super(spinner);
  }

  displayedColumns: string[] = [
    'name',
    'stock',
    'price',
    'createdDate',
    'updatedDate',
    'photos',
    'qrCode',
    'editing',
    'delete',
  ];
  dataSource: MatTableDataSource<List_Product> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  async ngOnInit() {
    await this.getProducts();
  }

  async getProducts() {
    this.showSpinner(SpinnerType.BallRunningDots);
    const allProducts: { totalProductCount: number; products: List_Product[] } =
      await this.productService.read(
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
    this.dataSource = new MatTableDataSource<List_Product>(
      allProducts.products
    );
    this.paginator.length = allProducts.totalProductCount;
  }

  addProductImages(id: string) {
    this.dialogService.openDialog({
      componentType: SelectProductImageDialogComponent,
      data: id,
      options: {
        width: '1000px',
      },
    });
  }

  async pageChanged() {
    await this.getProducts();
  }

  showQRCode(productId:string){
    this.dialogService.openDialog({
      componentType:QrcodeDialogComponent,
      data:productId,
      afterClosed:()=>{}
    })
  }
}
