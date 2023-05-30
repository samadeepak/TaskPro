import { Component } from '@angular/core';

@Component({
  selector: 'app-drop-zone',
  templateUrl: './drop-zone.component.html',
  styleUrls: ['./drop-zone.component.css']
})
export class DropZoneComponent {
  isDragging = false;
  droppedItems: string[] = [];

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
    console.log("Yes");
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;

    const data = event.dataTransfer?.getData('text/plain');
    if (data) {
      this.droppedItems.push(data);
    }
  }

  handleItemDragged(item: string) {
    this.droppedItems.push(item);
  }
}
