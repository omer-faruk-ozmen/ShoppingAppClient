import { CustomToastrService, ToastrMessageType, ToastrPosition } from './../../../../services/ui/custom-toastr.service';
import { Create_Basket_Item } from './../../../../contracts/basket/create-basket-item';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from './../../../../base/base.component';
import { BasketService } from './../../../../services/common/models/basket.service';
import { FilesService } from './../../../../services/common/models/file.service';
import { async } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { List_Product } from './../../../../contracts/list_product';
import { ProductService } from './../../../../services/common/models/product.service';
import { Component, OnInit } from '@angular/core';
import { BaseUrl } from 'src/app/contracts/baseUrl';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private filesService: FilesService,
    private basketService: BasketService,
    private customToastrService:CustomToastrService,
    spinner: NgxSpinnerService
  ) {
    super(spinner);
  }

  productDefaultImage = '../../../../../assets/products.png';
  currentPageNo: number;
  totalProductCount: number;
  totalPageCount: number;
  pageSize: number = 12;
  pageList: number[] = [];
  baseUrl: BaseUrl;
  products: List_Product[];

  async ngOnInit() {
    this.baseUrl = await this.filesService.getBaseStorageUrl();

    this.activatedRoute.params.subscribe(async (params) => {
      this.currentPageNo = parseInt(params['pageNo'] ?? 1);

      const data: { totalProductCount: number; products: List_Product[] } =
        await this.productService.read(
          this.currentPageNo - 1,
          this.pageSize,
          () => {},
          (errorMessage) => {}
        );

      this.products = data.products;

      this.products = this.products.map<List_Product>((p) => {
        const listProduct: List_Product = {
          id: p.id,
          createdDate: p.createdDate,
          productImageFiles: p.productImageFiles,
          imagePath: `${
            p.productImageFiles.find((p) => p.showcase)
              ? this.baseUrl.url +
                '/' +
                p.productImageFiles.find((p) => p.showcase).path
              : this.productDefaultImage
          }`,
          name: p.name,
          price: p.price,
          stock: p.stock,
          updatedDate: p.updatedDate,
        };
        return listProduct;
      });

      this.totalProductCount = data.totalProductCount;
      this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize);

      this.pageList = [];

      if (this.currentPageNo - 3 <= 0)
        for (let i = 1; i <= 7; i++) this.pageList.push(i);
      else if (this.currentPageNo + 3 >= this.totalPageCount)
        for (let i = this.totalPageCount - 6; i <= this.totalPageCount; i++)
          this.pageList.push(i);
      else
        for (let i = this.currentPageNo - 3; i <= this.currentPageNo + 3; i++)
          this.pageList.push(i);
    });
  }

  async addToBasket(product: List_Product) {
    this.showSpinner(SpinnerType.BallRunningDots)
    let _basketItem: Create_Basket_Item = new Create_Basket_Item();
    _basketItem.productId = product.id;
    _basketItem.quantity = 1;
    await this.basketService.add(_basketItem);
    this.hideSpinner(SpinnerType.BallRunningDots)
    this.customToastrService.message(`${product.name} has been successfully added to cart ` ,"Added To Cart",{
      messageType:ToastrMessageType.Success,
      position:ToastrPosition.TopRight
    })
  }
}
