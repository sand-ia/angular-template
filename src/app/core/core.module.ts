import { NgModule } from '@angular/core';
import { FormValidatorService } from './services/form-validator.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';
import { FilterService } from './services/filter.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.inteceptor';
import { UnauthorizedInterceptor } from './interceptors/unauthorized.interceptor';
import { ServerErrorInterceptor } from './interceptors/server-error.interceptor';
import { AuthenticationGuard } from './guards/authentication.guard';
import { NotAuthenticationGuard } from './guards/not-authentication.guard';

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true,
    },
    AuthenticationGuard,
    NotAuthenticationGuard,
    FormValidatorService,
    AuthenticationService,
    FilterService,
  ],
  imports: [HttpClientModule],
})
export class CoreModule {}
