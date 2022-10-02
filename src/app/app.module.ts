import { BasketsModule } from './ui/components/baskets/baskets.module';
import { HttpErrorHandlerInterceptorService } from './services/common/http-error-handler-interceptor.service';
import { LoginComponent } from './ui/components/login/login.component';
import { UiModule } from './ui/ui.module';
import { AdminModule } from './admin/admin.module';
import { CUSTOM_ELEMENTS_SCHEMA,  NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule,
} from '@abacritt/angularx-social-login';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
@NgModule({
  declarations: [AppComponent, LoginComponent, DynamicLoadComponentDirective],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    UiModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BasketsModule,
    NgxSpinnerModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('accessToken'),
        allowedDomains: ['localhost:7082'],
        //ip not to go
        disallowedRoutes: ['www.google.com'],
      },
    }),
    SocialLoginModule,
  ],
  providers: [
    {
      provide: 'baseUrl',
      useValue: 'https://localhost:7082/api',
      multi: true,
    },{
      provide: 'baseSignalRUrl',
      useValue: 'https://localhost:7082/',
      multi: true,
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '550491275613-v52i0160u02tk70ki07nitmcikitl4n1.apps.googleusercontent.com'
            ),
          },
        ],
        onError: (err) => console.log(err),
      } as SocialAuthServiceConfig,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorHandlerInterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
