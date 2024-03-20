import { Component } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { ServerErrorModalComponent } from './server-error-modal/server-error-modal.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  constructor(public dialog: Dialog) {
    this.openDialog();
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
