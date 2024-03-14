import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerErrorModalComponent } from './server-error-modal/server-error-modal.component';
import { ModalComponent } from './modal.component';
import { AtomsModule } from '../../atoms/atoms.module';

@NgModule({
  declarations: [ServerErrorModalComponent, ModalComponent],
  imports: [CommonModule, AtomsModule],
  exports: [ModalComponent],
})
export class ModalModule {}
