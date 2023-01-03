import { Menu } from './../../../contracts/application-configurations/menu';
import { Observable, firstValueFrom } from 'rxjs';
import { HttpClientService } from './../http-client.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationEndpointService {

  constructor(private httpClientService:HttpClientService) { }

  async assignRoleEndpoint(roles:string[],code:string,menu:string,successCallBack?:()=>void,errorCallBack?:(error)=>void){

    const observable:Observable<any>= this.httpClientService.post({
      controller:"AuthorizationEndpoints"
    },{
      roles:roles,
      code:code,
      menu:menu
      
    })

    const promiseData=firstValueFrom(observable)
    promiseData
    .then(successCallBack)
    .catch(errorCallBack)

    return await promiseData;
  }


  async getRolesToEndpoint(code:string,menu:string,successCallBack?:()=>void,errorCallBack?:(error)=>void){
    const observable:Observable<any>=this.httpClientService.post({
      controller:"AuthorizationEndpoints",
      action:"get-roles-to-endpoint"
    },{code:code,menu:menu});

    
    const promiseData=firstValueFrom(observable)
    promiseData
    .then(successCallBack)
    .catch(errorCallBack)

    return (await promiseData).roles;
  }
}
