import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication.component';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [AuthenticationComponent],
  imports: [CommonModule, SharedModule],
})
export class AuthenticationModule {}
