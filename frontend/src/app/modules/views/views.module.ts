import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MbtTestingComponent } from '../../views/mbt-testing/mbt-testing.component';
import { SettingsComponent } from '../../views/settings/settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from '../shared-components/shared-components.module';

@NgModule({
  declarations: [
    MbtTestingComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule
  ]
})
export class ViewsModule { }
