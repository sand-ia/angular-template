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
import { MatDialog } from '@angular/material/dialog';
import { ServerErrorModalComponent } from '../../shared/organisms/modal/server-error-modal/server-error-modal.component';
import { ModalService } from 'src/app/shared/organisms/modal/modal.service';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
  constructor(private modalService: ModalService, private dialog: MatDialog) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status >= 500 && error.status < 599) {
          this.modalService.openDialog();
          this.dialog.open(ServerErrorModalComponent);
        }
        return throwError(() => error);
      })
    );
  }
}
