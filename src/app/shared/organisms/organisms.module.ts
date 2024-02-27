import { NgModule } from '@angular/core';
import { SidebarModule } from './sidebar/sidebar.module';

@NgModule({
  imports: [SidebarModule],
  exports: [SidebarModule],
})
export class OrganismsModule {}
