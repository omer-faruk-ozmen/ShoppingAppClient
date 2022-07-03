import { Observable, firstValueFrom } from 'rxjs';
import { Create_User } from './../../../contracts/users/create_user';
import { User } from './../../../entites/user';
import { HttpClientService } from './../http-client.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClientService: HttpClientService) {}

  async create(user: User): Promise<Create_User> {
    const observable: Observable<Create_User | User> =
      this.httpClientService.post<Create_User | User>(
        {
          controller: 'users',
        },
        user
      );

    return (await firstValueFrom(observable)) as Create_User;
  }
}
