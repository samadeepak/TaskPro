import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { DragService } from 'src/app/modules/services/drag.service';

@Directive({
  selector: '[appDroppable]'
})
export class DroppableDirective implements OnInit {

  private self: any;
  private onDragEnter: Function;
  private onDragLeave: Function;
  private onDragOver: Function;
  private onDrop: Function;

  public options: DroppableOptions = {
    zone: 'appZone'
  };

  // Allow options input by using [appDroppable]='{}'
  @Input()
  set appDroppable(options: DroppableOptions) {
    if (options) {
      this.options = options;
    }
  }

  // Drop Event Emitter
  @Output() public onDroppableComplete: EventEmitter<DroppableEventObject> = new EventEmitter();

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private dragService: DragService) {
    this.self = this.elementRef.nativeElement;
    this.renderer.addClass(this.self, 'app-droppable');
  }
  ngOnInit() {

    // Add available zone
    // This exposes the zone to the service so a draggable element can update it
    this.dragService.addAvailableDropZone(this.options.zone, {
      begin: () => {
        this.renderer.addClass(this.elementRef.nativeElement, 'app-droppable-target');
      },
      end: () => {
        this.renderer.removeClass(this.elementRef.nativeElement, 'app-droppable-target');
      }
    });

    this.addOnDragEvents();
  }

  private addOnDragEvents(): void {
    this.onDragEnter = this.renderer.listen(this.self, 'dragenter', (event: DragEvent): void => {
      this.handleDragEnter(event);
    });

    this.onDragLeave = this.renderer.listen(this.self, 'dragleave', (event: DragEvent): void => {
      event.preventDefault();
      this.handleDragLeave(event);
    });
    this.onDragOver = this.renderer.listen(this.self, 'dragover', (event: DragEvent): void => {
      event.preventDefault();
      this.handleDragOver(event);
    });
    this.onDragOver = this.renderer.listen(this.self, 'drop', (event: DragEvent): void => {
      event.preventDefault();
      this.handleDrop(event);
    });
  }

  private handleDragEnter(event: DragEvent) {
    console.log(event.type);
    
    this.dragService.enterDrag(this.options.zone);
  }

  private handleDragLeave(event: DragEvent) {
    console.log(event.type);
    this.dragService.leaveDrag(this.options.zone);
  }

  private handleDragOver(event: DragEvent) {
    console.log(event.type + "[" + event.x + ", " + event.y + "]");
    //this.dragService.dragOver(this.options.zone);
  }

  private handleDrop(event: DragEvent) {
    const data = JSON.parse(event.dataTransfer.getData('Text'));
    const element = this.createTargetElement(data);
    // this.renderer.addClass(element, 'app-dropped-item')
    // console.log("Element");
    event.dataTransfer.effectAllowed = 'all';
    event.dataTransfer.dropEffect = 'copy';
    this.self.append(element);
  }

  private createTargetElement(data:any){
    const element = this.renderer.createElement("div");
    this.renderer.addClass(element, 'app-dropped-item')
    const text = this.renderer.createText(data.name);
    element.append(text);
    return element;
  }
}
// 11
export interface DroppableOptions {
  data?: any;
  zone?: string;
}

// Droppable Event Object
export interface DroppableEventObject {
  data: any;
  zone: any;
}
