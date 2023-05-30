import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TileComponent } from 'src/app/shared-components/tile/tile.component';
import { PrimaryButtonComponent } from '../../shared-components/primary-button/primary-button.component';
import { RouterModule } from '@angular/router';
import { NodeComponent } from '../../shared-components/node/node.component';
import { EdgeComponent } from '../../shared-components/edge/edge.component';
import { CanvasComponent } from '../../shared-components/canvas/canvas.component';
import { DraggableItemComponent } from '../../shared-components/draggable-item/draggable-item.component';
import { DropZoneComponent } from '../../shared-components/drop-zone/drop-zone.component';
import { DraggableDirective } from '../../shared-components/draggable-directive/draggable.directive';
import { DroppableDirective } from 'src/app/shared-components/droppable-directive/droppable.directive';


@NgModule({
  declarations: [
    TileComponent,
    PrimaryButtonComponent,
    NodeComponent,
    EdgeComponent,
    CanvasComponent,
    DraggableItemComponent,
    DropZoneComponent,
    DraggableDirective,
    DroppableDirective
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    TileComponent,
    PrimaryButtonComponent,
    CanvasComponent,
    DraggableDirective,
    DroppableDirective
  ]
})
export class SharedComponentsModule { }

