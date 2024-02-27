import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { OrganismsModule } from './organisms/organisms.module';
import { AtomsModule } from './atoms/atoms.module';

@NgModule({
  imports: [ReactiveFormsModule, OrganismsModule, AtomsModule],
  exports: [ReactiveFormsModule, OrganismsModule, AtomsModule],
})
export class SharedModule {}
