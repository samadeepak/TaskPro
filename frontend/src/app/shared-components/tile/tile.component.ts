import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {

  @Input("iconName") iconName: string = 'report';
  @Input("description") description: string = '';
  @Input("target") target: string = '/';

  constructor() { }

  ngOnInit(): void {
  }

}
