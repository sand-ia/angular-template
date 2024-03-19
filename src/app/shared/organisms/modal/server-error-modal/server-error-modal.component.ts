import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';

@Component({
  templateUrl: './server-error-modal.component.html',
  styleUrls: ['./server-error-modal.component.scss'],
})
export class ServerErrorModalComponent {
  constructor(public dialogRef: DialogRef<string>) {}
}
