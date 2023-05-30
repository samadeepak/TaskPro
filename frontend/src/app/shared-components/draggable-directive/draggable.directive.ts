import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DragService } from 'src/app/modules/services/drag.service';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective implements OnInit {
  private self: any;
  // Options for the directive
  private options: DraggableOptions;

  // Events
  private onDragStart: Function;
  private onDragEnd: Function;

  // Gets triggered everytime draggable element options change
  @Input()
  set appDraggable(options: DraggableOptions) {
    if (options) {
      this.options = options;
    }
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private dragService: DragService) {
    this.self = this.elementRef.nativeElement;
    // 3
    this.renderer.setProperty(this.self, 'draggable', true);
    this.renderer.addClass(this.self, 'app-draggable');
  }

  // 4
  ngOnInit() {
    this.addDragEvents();
  }
  
  /**
  * @desc responsible for adding the drag events to the directive
  * @note transfers drag data using the Drag and Drop API (Browser)
  * @note known CSS issue where a draggable element cursor cant be set while dragging in Chrome
  */
  // 6
  private addDragEvents(): void {

    //dragStart callback setup
    this.onDragStart = this.renderer.listen(this.self, 'dragstart', (event: DragEvent): void => {
      console.log("DragStart");

      // Transfer the data using Drag and Drop API (Browser)
      event.dataTransfer.setData('Text', JSON.stringify(this.options.data));
    });

    //dragEnd callback sedtup
    this.onDragEnd = this.renderer.listen(this.self, 'dragend', (event: DragEvent): void => {
      console.log("DragEnd");
    });
  }
}

// 9
export interface DraggableOptions {
  data?: any;
}