import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerErrorModalComponent } from './server-error-modal/server-error-modal.component';
import { ModalComponent } from './modal.component';
import { AtomsModule } from '../../atoms/atoms.module';
import { DialogModule } from '@angular/cdk/dialog';

@NgModule({
  declarations: [ServerErrorModalComponent, ModalComponent],
  imports: [CommonModule, AtomsModule, DialogModule],
  exports: [ModalComponent],
})
export class ModalModule {}
