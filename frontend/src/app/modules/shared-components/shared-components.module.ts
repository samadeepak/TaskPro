import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TileComponent } from 'src/app/shared-components/tile/tile.component';
import { PrimaryButtonComponent } from '../../shared-components/primary-button/primary-button.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    TileComponent,
    PrimaryButtonComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    TileComponent,
    PrimaryButtonComponent
  ]
})
export class SharedComponentsModule { }
