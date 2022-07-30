import { UserAuthService } from 'src/app/services/common/models/user-auth.service';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from './../ui/custom-toastr.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {
  constructor(
    private toastrService: CustomToastrService,
    private userAuthService: UserAuthService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        switch (error.status) {
          case HttpStatusCode.Unauthorized:
            this.toastrService.message(
              'You are not authorized to do this operation!',
              'Unauthorized!',
              {
                messageType: ToastrMessageType.Error,
                position: ToastrPosition.BottomFullWidth,
              }
            );
            this.userAuthService
              .refreshTokenLogin(localStorage.getItem('refreshToken'))
              .then((data) => {});
            break;
          case HttpStatusCode.InternalServerError:
            this.toastrService.message(
              'An error was encountered while connecting to the server!',
              'Server Error',
              {
                messageType: ToastrMessageType.Error,
                position: ToastrPosition.BottomFullWidth,
              }
            );
            break;
          case HttpStatusCode.BadRequest:
            this.toastrService.message(
              'An invalid operation was made!',
              'Invalid Request!',
              {
                messageType: ToastrMessageType.Error,
                position: ToastrPosition.BottomFullWidth,
              }
            );
            break;
          default:
            this.toastrService.message(
              'An unexpected error has occurred!',
              'Error!',
              {
                messageType: ToastrMessageType.Error,
                position: ToastrPosition.BottomFullWidth,
              }
            );
            break;
        }
        return of(error);
      })
    );
  }
}
