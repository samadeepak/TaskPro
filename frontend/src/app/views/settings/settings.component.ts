import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { EventService } from 'src/app/modules/services/event.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  public configForm: FormGroup;

  environments = ["L3", "L2", "L1", "local"];
  public hasConfig: boolean = true;
  public config: Map<String, String> = new Map();


  constructor(private eventService: EventService, private fb: FormBuilder) {
    this.config = this.eventService.getConfig();
    console.log(this.config);
    this.configForm = this.fb.group({
      "environment": this.config.get('environment'),
      "username": this.config.get('username'),
      "password": this.config.get('password')
    });
  }

  ngOnInit(): void {
    this.eventService.currentConfig.subscribe(config => this.update(config));
  }

  updateConfig(environment: String, userName: String, password: String) {
    this.config.set('environment', environment);
    this.config.set('username', userName);
    this.config.set('password', password);
  }

  update(config: Map<String, String>) {
    this.updateConfig(String(config.get('environment')), String(config.get('username')), String(config.get('password')));
  }

  onSave() {
    this.updateConfig(this.configForm.get('environment')?.value,
      this.configForm.get('username')?.value,
      this.configForm.get('password')?.value);
    this.fireConfigChangeEvent();
  }

  fireConfigChangeEvent() {
    this.eventService.changeConfig(this.config);
  }
}
