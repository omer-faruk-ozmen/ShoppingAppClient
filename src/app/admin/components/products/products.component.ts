import { QrcodeSearchDialogComponent } from './../../../dialogs/qrcode-search-dialog/qrcode-search-dialog.component';
import { DialogService } from './../../../services/common/dialog/dialog.service';
import { HttpClientService } from './../../../services/common/http-client.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from './../../../base/base.component';
import { Component, OnInit } from '@angular/core';
import { Create_Product } from 'src/app/contracts/create_product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private httpClientService: HttpClientService,
    private dialogService:DialogService
  ) {
    super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallRunningDots);
  }

  productQRCodeSarch(){
    this.dialogService.openDialog({
      componentType:QrcodeSearchDialogComponent,
      data:null,
      options:{
        width:"700px"
      },
      afterClosed:()=>{}
    })
  }
}
