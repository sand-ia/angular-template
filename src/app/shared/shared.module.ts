import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from '@angular/cdk/dialog';
import { OrganismsModule } from './organisms/organisms.module';
import { AtomsModule } from './atoms/atoms.module';

@NgModule({
  imports: [ReactiveFormsModule, DialogModule, OrganismsModule, AtomsModule],
  exports: [ReactiveFormsModule, DialogModule, OrganismsModule, AtomsModule],
})
export class SharedModule {}
