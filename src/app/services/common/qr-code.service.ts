import { Observable, firstValueFrom } from 'rxjs';

import { HttpClientService, RequestParameters } from './http-client.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QrCodeService {

  constructor(private httpClientService:HttpClientService) { }

  async generateQRCode(productId:string,successCallBack?:()=>void,errorCallBack?:(errorMessage)=>void){
    const observable:Observable<Blob> = this.httpClientService.get({
      controller:'products',
      action:"qr-code",
      responseType:'blob'
    },productId)


    const promiseData=  firstValueFrom(observable)
    promiseData.then(successCallBack).catch(errorCallBack)

    return await promiseData
  }
}
