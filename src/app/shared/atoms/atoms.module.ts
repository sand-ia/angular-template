import { NgModule } from '@angular/core';
import { ButtonModule } from './button/button.module';

@NgModule({
  imports: [ButtonModule],
  exports: [ButtonModule],
})
export class AtomsModule {}
