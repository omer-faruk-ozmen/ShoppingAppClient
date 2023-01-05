import { Update_Product } from './../../../contracts/update_product';
import { Single_Product } from './../../../contracts/product';

import { List_Product_Image } from './../../../contracts/list_product_image';
import { first, firstValueFrom, Observable } from 'rxjs';
import { List_Product } from './../../../contracts/list_product';
import { HttpClientService } from './../http-client.service';
import { Injectable } from '@angular/core';
import { Create_Product } from 'src/app/contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClientService: HttpClientService) {}

  async read(
    page: number = 0,
    size: number = 5,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ): Promise<{ totalProductCount: number; products: List_Product[] }> {
    const promiseData: Promise<{
      totalProductCount: number;
      products: List_Product[];
    }> = this.httpClientService
      .get<{ totalProductCount: number; products: List_Product[] }>({
        controller: 'products',
        queryString: `page=${page}&size=${size}`,
      })
      .toPromise();

    promiseData
      .then((data) => successCallBack())
      .catch((errorResponse: HttpErrorResponse) =>
        errorCallBack(errorResponse.message)
      );

    return await promiseData;
  }

  async getById(productId:string,successCallBack?:()=>void,errorCallBack?:(errorMessage:string)=>void):Promise<Single_Product>{
    const observable:Observable<any> = this.httpClientService.get<Single_Product>({
      controller:'products'
    },productId)

    const promiseData = firstValueFrom(observable)

    promiseData.then(successCallBack).catch((errorResponse:HttpErrorResponse)=> errorCallBack(errorResponse.message))

    return await promiseData;
  }

  create(
    product: Create_Product,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    this.httpClientService.post({ controller: 'products' }, product).subscribe(
      (result) => {
        successCallBack();
      },
      (errorResponse: HttpErrorResponse) => {
        const _error: Array<{ key: string; value: Array<string> }> =
          errorResponse.error;
        let message = '';
        _error.forEach((v, index) => {
          v.value.forEach((_v, _index) => {
            message += `${_v}<br>`;
          });
        });
        errorCallBack(message);
      }
    );
  }

  async put(product:Update_Product,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
    ){

      const observable:Observable<any>= this.httpClientService.put({
        controller:'products'
      },product)

      const promiseData=firstValueFrom(observable)

      promiseData.then(successCallBack).catch((errorResponse:HttpErrorResponse)=> errorCallBack(errorResponse.message))

      return await promiseData

  }

  async delete(id: string) {
    const deleteObs: Observable<any> = this.httpClientService.delete<any>(
      {
        controller: 'products',
      },
      id
    );
    await firstValueFrom(deleteObs);
  }
  async readImages(
    id: string,
    successCallBack?: () => void
  ): Promise<List_Product_Image[]> {
    const getObservable: Observable<List_Product_Image[]> =
      this.httpClientService.get<List_Product_Image[]>(
        {
          action: 'getproductimages',
          controller: 'products',
        },
        id
      );

    const images: List_Product_Image[] = await firstValueFrom(getObservable);
    successCallBack();
    return images;
  }

  async deleteImage(id: string, imageId: string, successCallBack?: () => void) {
    const deleteObservable = this.httpClientService.delete(
      {
        action: 'deleteproductimage',
        controller: 'products',
        queryString: `imageId=${imageId}`,
      },
      id
    );
    await firstValueFrom(deleteObservable);
    successCallBack();
  }

  async changeShowcaseImage(
    imageId: string,
    productId: string,
    successCallBack?: () => void
  ):Promise<void> {
    const changeShowcaseImageObservable = this.httpClientService.put(
      {
        controller: 'products',
        action: 'ChangeShowcaseImage',
        queryString: `imageId=${imageId}&productId=${productId}`,
      },{}
    );
    await firstValueFrom(changeShowcaseImageObservable);
    successCallBack();
  }
}
