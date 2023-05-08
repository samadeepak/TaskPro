import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventService } from 'src/app/modules/services/event.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // @Input('isSidebarToggleActive') isSidebarToggleActive: boolean;
  static ACTIVE_TOGGLE_CSS_CLASS = "bx-menu-alt-right";
  static INACTIVE_TOGGLE_CSS_CLASS = "bx-menu";

  public isActiveToggle!: boolean;
  public toggleCssClass = HeaderComponent.INACTIVE_TOGGLE_CSS_CLASS;

  constructor(private eventService: EventService) { }


  ngOnInit(): void {
    this.eventService.currentStatus.subscribe(status => this.updateToggleIcon(status));
  }

  onToggle() {
    this.updateToggleIcon(!this.isActiveToggle);
    this.fireSidebarToggleEvent();
  }

  fireSidebarToggleEvent() {
    this.eventService.changeSideBarStatus(this.isActiveToggle);
  }

  updateToggleIcon(status: boolean) {
    this.isActiveToggle = status;

    if (!this.isActiveToggle) {
      this.toggleCssClass = HeaderComponent.INACTIVE_TOGGLE_CSS_CLASS;

    } else {
      this.toggleCssClass = HeaderComponent.ACTIVE_TOGGLE_CSS_CLASS;
    }
  }
}
