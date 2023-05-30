import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { LayoutModule } from './modules/layout/layout.module';
import { EventService } from './modules/services/event.service';
import { ViewsModule } from './modules/views/views.module';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { SharedComponentsModule } from './modules/shared-components/shared-components.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    ViewsModule,
    LayoutModule,
    SharedComponentsModule
  ],
  providers: [
    EventService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
