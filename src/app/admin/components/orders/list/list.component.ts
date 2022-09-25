import { OrderService } from './../../../../services/common/models/order.service';
import { List_Order } from './../../../../contracts/order/list_order';
import { BaseComponent, SpinnerType } from './../../../../base/base.component';
import { MatPaginator } from '@angular/material/paginator';
import { AlertifyService, MessageType, Position } from './../../../../services/admin/alertify.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(
    private orderService: OrderService,
    spinner: NgxSpinnerService,
    private alertifyService: AlertifyService
  ) {
    super(spinner);
  }

  displayedColumns: string[] = [
    'orderCode',
    'username',
    'totalPrice',
    'createdDate',
    'updatedDate',
    'editing',
    'delete'
  ];
  dataSource: MatTableDataSource<List_Order> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  async ngOnInit() {
    await this.getOrders();
  }

  async getOrders() {
    this.showSpinner(SpinnerType.BallRunningDots);
    const allOrders: { totalOrderCount: number; orders: List_Order[] } =
      await this.orderService.getAllOrders(
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
    this.dataSource = new MatTableDataSource<List_Order>(
      allOrders.orders
    );
    this.paginator.length = allOrders.totalOrderCount;
  }


  async pageChanged() {
    await this.getOrders();
  }
}
