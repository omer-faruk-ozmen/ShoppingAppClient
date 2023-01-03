import { List_User } from './../../../contracts/users/list_user';
import { HttpErrorResponse } from '@angular/common/http';
import { SocialUser } from 'angularx-social-login';
import { TokenResponse } from './../../../contracts/token/tokenResponse';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from './../../ui/custom-toastr.service';
import { Observable, firstValueFrom } from 'rxjs';
import { Create_User } from './../../../contracts/users/create_user';
import { User } from './../../../entites/user';
import { HttpClientService } from './../http-client.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private httpClientService: HttpClientService,
    private toastrService: CustomToastrService
  ) {}

  async create(user: User): Promise<Create_User> {
    const observable: Observable<Create_User | User> =
      this.httpClientService.post<Create_User | User>(
        {
          controller: 'auth',
        },
        user
      );

    return (await firstValueFrom(observable)) as Create_User;
  }
  async getAllUsers(
    page: number,
    size: number,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ): Promise<{ totalUsersCount: number; users: List_User[] }> {
    const observable: Observable<{
      totalUsersCount: number;
      users: List_User[];
    }> = this.httpClientService.get({
      controller: 'users',
      action: 'get-all-users',
      queryString: `page=${page}&size=${size}`,
    });

    const promiseData = firstValueFrom(observable);
    promiseData
      .then((value) => successCallBack())
      .catch((error) => errorCallBack(error));

    return await promiseData;
  }

  async updatePassword(
    userId: string,
    resetToken: string,
    password: string,
    passwordConfirm: string,
    successCallBack?: () => void,
    errorCallBack?: (error) => void
  ) {
    const observable: Observable<any> = this.httpClientService.post(
      {
        action: 'update-password',
        controller: 'users',
      },
      {
        userId: userId,
        resetToken: resetToken,
        password: password,
        passwordConfirm: passwordConfirm,
      }
    );

    const promiseData: Promise<any> = firstValueFrom(observable);
    promiseData
      .then((value) => successCallBack())
      .catch((error) => errorCallBack(error));
    await promiseData;
  }

  async assignRoleToUser(
    id: string,
    roles: string[],
    successCallBack?: () => void,
    errorCallBack?: (error) => void
  ) {
    const observable: Observable<any> = this.httpClientService.post(
      {
        controller: 'users',
        action: 'assign-role-to-user',
      },
      {
        roles: roles,
        id: id,
      }
    );

    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallBack);

    await promiseData;
  }
  async getRolesToUser(
    id: string,
    successCallBack?: () => void,
    errorCallBack?: (error) => void
  ):Promise<string[]> {
    const observable: Observable<{userRoles:string[]}> = this.httpClientService.get({
      controller: 'users',
      action: 'get-roles-to-user',
    },id);

    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallBack);

    return (await promiseData).userRoles;
  }
}
