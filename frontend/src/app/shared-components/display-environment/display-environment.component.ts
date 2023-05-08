import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/modules/services/event.service';

@Component({
  selector: 'app-display-environment',
  templateUrl: './display-environment.component.html',
  styleUrls: ['./display-environment.component.css']
})
export class DisplayEnvironmentComponent implements OnInit {

  public config: Map<String, String> = new Map();
  public environment?: String = 'None';

  constructor(private eventService: EventService) {
    this.config = this.eventService.getConfig();
    if ('' === this.config.get('environment')) {
      this.environment = 'None';
    }
  }

  ngOnInit(): void {
    this.eventService.currentConfig.subscribe(config => this.update(config));
    this.environment = this.config.get('environment');
    if ('' === this.config.get('environment')) {
      this.environment = 'None';
    }
    console.log(this.environment);
  }

  public update(config: Map<String, String>) {
    this.updateConfig(String(config.get('environment')), String(config.get('username')), String(config.get('password')));
  }

  updateConfig(environment: String, userName: String, password: String) {
    this.config.set('environment', environment);
    this.config.set('username', userName);
    this.config.set('password', password);
    this.environment = this.config.get('environment');
    if ('' === this.config.get('environment')) {
      this.environment = 'None';
    }
  }
}
