import { Component } from '@angular/core';
import { ConvasContextService } from 'src/app/modules/services/convas-context.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {

  private draggableElements = 3;
  private droppableElements = 2;
  public droppableZones: Array<any> = [];
  public draggableObjects: Array<any> = [];


  constructor(_canvasContextService: ConvasContextService) {
    // NOTE: This is just for the demo - But it gives you an idea of how to set a drag/drop implementation
    for (let i = 0; i < this.draggableElements; i++) {
      // Define the draggable objects relative to their position
      this.draggableObjects.push({
        data: {
          id: i,
          name: 'Item  - ' + i
        }
      });

    }
    for (let i = 0; i < this.droppableElements; i++) {
      // Define the droppable objects
      this.droppableZones.push({
        zone: i
      })
    }

  }

}
