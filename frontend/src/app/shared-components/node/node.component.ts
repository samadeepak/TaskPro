import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent {
  @Input() node:any;
  @Output() delete = new EventEmitter();

  onDelete() {
    this.delete.emit();
  }
}
