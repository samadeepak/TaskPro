import { Component, Input, OnInit } from '@angular/core';
import { EventService } from 'src/app/modules/services/event.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public sideBarStatus!: boolean;
  public sideBarCssClass = ''

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.currentStatus.subscribe(status => this.updateSideBar(status));
  }

  updateSideBar(status: boolean) {
    this.sideBarStatus = status;
    if (this.sideBarStatus) {
      this.sideBarCssClass = 'active';
    } else {
      this.sideBarCssClass = '';
    }
  }
}
