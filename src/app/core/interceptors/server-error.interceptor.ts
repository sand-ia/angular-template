import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Dialog } from '@angular/cdk/dialog';
import { ServerErrorModalComponent } from '../../shared/organisms/modal/server-error-modal/server-error-modal.component';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
  constructor(private dialog: Dialog) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status >= 500 && error.status < 599) {
          this.openDialog();
        }
        return throwError(() => error);
      })
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open<string>(ServerErrorModalComponent, {
      width: '250px',
    });

    dialogRef.closed.subscribe(() => {
      console.log('The dialog was closed');
    });
  }
}
