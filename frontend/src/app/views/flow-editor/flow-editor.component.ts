import { Component, OnInit } from '@angular/core';
import { Edge } from 'src/app/models/editor.models';

@Component({
  selector: 'app-flow-editor',
  templateUrl: './flow-editor.component.html',
  styleUrls: ['./flow-editor.component.css']
})
export class FlowEditorComponent implements OnInit {
  private nodes: Node [] = [];
  private edges: Edge [] = [];

  canvasWidth! : number;
  canvasHeight! : number;
  pannelWidth!: number;
  pannelHeight!: number;

  ngOnInit(): void {
    this.canvasWidth = window.innerWidth - 180;
    this.canvasHeight = window.innerHeight;
    this.pannelWidth = 180;
    this.pannelHeight = this.canvasHeight;
  }
}

