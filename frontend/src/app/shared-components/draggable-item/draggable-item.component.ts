import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-draggable-item',
  templateUrl: './draggable-item.component.html',
  styleUrls: ['./draggable-item.component.css']
})
export class DraggableItemComponent {
  @Input() item!: string;
  @HostBinding('class.dragging') isDragging = false;
  //@Output() itemDragged = new EventEmitter<string>();
  @Output() dragStart = new EventEmitter<PointerEvent>();
  @Output() dragMove = new EventEmitter<PointerEvent>();
  @Output() dragEnd = new EventEmitter<PointerEvent>();

  @HostListener('pointerdown') onMouseDown(event: PointerEvent) {
    this.isDragging = true;
    this.dragStart.emit(event);
    console.log("Down");
  }
 
  @HostListener('document:pointermove') onMouseMove(event: PointerEvent) {
    if(!this.isDragging)
    {
      return;
    }
    console.log("Drag");
    this.dragMove.emit(event);
  }

  @HostListener('document:pointerup') onMouseUp(event: PointerEvent) {
    if(!this.isDragging)
    {
      return;
    }
    console.log("Up");
    this.isDragging = false;
    this.dragEnd.emit(event);
  }

  // onDragStart(event: DragEvent) {
  //   event.dataTransfer?.setData('text/plain', this.item);
  //   this.itemDragged.emit(this.item);
  // }
}
