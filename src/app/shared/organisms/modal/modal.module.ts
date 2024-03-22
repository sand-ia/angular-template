import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtomsModule } from '../../atoms/atoms.module';
import { ServerErrorModalComponent } from './server-error-modal/server-error-modal.component';
import { MaterialsModule } from '../../materials/materials.module';

@NgModule({
  declarations: [ServerErrorModalComponent],
  imports: [CommonModule, AtomsModule, MaterialsModule],
})
export class ModalModule {}
