import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { PageContentComponent } from '../../layout/page-content/page-content.component';
import { RouterModule } from '@angular/router';
import { DisplayEnvironmentComponent } from 'src/app/shared-components/display-environment/display-environment.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    PageContentComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedComponentsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    PageContentComponent
  ]
})
export class LayoutModule { }
