import { NgModule } from '@angular/core';
import { SidebarModule } from './sidebar/sidebar.module';
import { ModalModule } from './modal/modal.module';

@NgModule({
  imports: [SidebarModule, ModalModule],
  exports: [SidebarModule],
})
export class OrganismsModule {}
