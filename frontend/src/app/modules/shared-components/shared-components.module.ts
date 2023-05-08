import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TileComponent } from 'src/app/shared-components/tile/tile.component';
import { PrimaryButtonComponent } from '../../shared-components/primary-button/primary-button.component';
import { DisplayEnvironmentComponent } from 'src/app/shared-components/display-environment/display-environment.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    TileComponent,
    PrimaryButtonComponent,
    DisplayEnvironmentComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    TileComponent,
    PrimaryButtonComponent,
    DisplayEnvironmentComponent
  ]
})
export class SharedComponentsModule { }
