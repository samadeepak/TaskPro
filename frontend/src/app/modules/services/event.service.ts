import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class EventService {
  static SIDEBAR_STATUS_EXPANDED = false
  // Sidebar
  private sideBarStatus: boolean = false;
  private sideBarEvents = new BehaviorSubject<boolean>(EventService.SIDEBAR_STATUS_EXPANDED);
  currentStatus = this.sideBarEvents.asObservable();

  // Environment settings
  private config: Map<String, String> = new Map();
  private configEvents = new BehaviorSubject<Map<String, String>>(this.config);
  currentConfig = this.configEvents.asObservable();
  constructor() {
    this.init();
    console.log("creating");
  }

  changeConfig(config: Map<String, String>) {
    console.log(config)
    this.configEvents.next(config);
    console.log(this.getConfig())
  }

  getConfig(): Map<String, String> {
    console.log(this.config);
    return this.config;
  }

  getSideBarStatus() {
    return this.sideBarEvents.getValue();
  }
  changeSideBarStatus(status: boolean) {
    this.sideBarStatus = status;
    // next is used for changing the current value of behaviour subject
    this.sideBarEvents.next(status);
  }

  init() {
    this.config.set('environment', '');
    this.config.set('username', '');
    this.config.set('password', '');
  }
}


