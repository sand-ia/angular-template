import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsModule } from '../../materials/materials.module';
import { ServerErrorModalComponent } from './server-error-modal/server-error-modal.component';

@NgModule({
  declarations: [ServerErrorModalComponent],
  imports: [CommonModule, MaterialsModule],
})
export class ModalsModule {}
