import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Dialog } from '@angular/cdk/dialog';
import { ServerErrorModalComponent } from './server-error-modal/server-error-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  activeModal$: Observable<boolean | null>;
  private activeModalSubject: BehaviorSubject<boolean | null>;

  constructor(private dialog: Dialog) {
    this.activeModalSubject = new BehaviorSubject<boolean | null>(true);
    this.activeModal$ = this.activeModalSubject.asObservable();
  }

  getActiveModal(): boolean | null {
    return this.activeModalSubject.getValue();
  }

  setActiveModal(modal: boolean | null): void {
    this.activeModalSubject.next(modal);
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
