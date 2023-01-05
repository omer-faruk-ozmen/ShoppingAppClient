import { Update_Product } from './../../contracts/update_product';
import { SpinnerType } from './../../base/base.component';
import {
  ToastrPosition,
  ToastrMessageType,
} from './../../services/ui/custom-toastr.service';
import { Single_Product } from './../../contracts/product';
import { ProductService } from './../../services/common/models/product.service';
import { BaseDialog } from './../base/base-dialog';
import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  OnDestroy,
  ElementRef,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService } from 'src/app/services/ui/custom-toastr.service';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode/public-api';

declare var $: any;

@Component({
  selector: 'app-qrcode-search-dialog',
  templateUrl: './qrcode-search-dialog.component.html',
  styleUrls: ['./qrcode-search-dialog.component.scss'],
})
export class QrcodeSearchDialogComponent
  extends BaseDialog<QrcodeSearchDialogComponent>
  implements OnInit, OnDestroy
{
  constructor(
    dialogRef: MatDialogRef<QrcodeSearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private spinner: NgxSpinnerService,
    private toastrService: CustomToastrService,
    private productService: ProductService
  ) {
    super(dialogRef);
  }
  ngOnDestroy(): void {
    this.scanner.stop();
  }

  ngOnInit(): void {
    this.scanner.start();
  }

  @ViewChild('scanner', { static: true }) scanner: NgxScannerQrcodeComponent;
  @ViewChild('txtStock', { static: true }) txtStock: ElementRef;
  @ViewChild('txtPrice', { static: true }) txtPrice: ElementRef;

  productId: string;
  stock: number;
  price: number;
  productName: string;

  async onEvent(e) {
    const data = (e as { data: string }).data;

    if (data != null && data != '') {
      const jsonData = JSON.parse(data);
      await this.getProduct(jsonData.Id);
    }
  }

  async getProduct(productId: string) {
    this.spinner.show(SpinnerType.BallRunningDots);
    const product: Single_Product = await this.productService.getById(
      productId,
      () => {
        this.spinner.hide(SpinnerType.BallRunningDots);
        this.toastrService.message('Product Details Listed', 'Success', {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight,
        });
      },
      (error) => {
        this.spinner.hide(SpinnerType.BallRunningDots);
        this.toastrService.message(error, 'No Registered Product Found', {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.TopRight,
        });
      }
    );
    this.stock = product.stock;
    this.price = product.price;
    this.productName = product.name;
    this.productId = productId;
  }

  async updateProduct() {

    const update_product:Update_Product=new Update_Product();

    update_product.id=this.productId;
    update_product.name=this.productName;
    update_product.stock=Number((this.txtStock.nativeElement as HTMLInputElement).value);
    update_product.price=Number((this.txtPrice.nativeElement as HTMLInputElement).value)

    this.spinner.show(SpinnerType.BallRunningDots)
    await this.productService.put(update_product,()=>{
      this.spinner.hide(SpinnerType.BallRunningDots)
      $('#btnClose').click();
      this.toastrService.message("The product has been successfully updated","Success",{
        messageType:ToastrMessageType.Success,
        position:ToastrPosition.TopRight
      })
    },(error)=>{
      this.spinner.hide(SpinnerType.BallRunningDots)
      this.toastrService.message(error,"Error",{
        messageType:ToastrMessageType.Error,
        position:ToastrPosition.TopRight
      })
    })
    
  }
}
