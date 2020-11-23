import { Injectable } from '@angular/core';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private endpoint: string;

  constructor(private mqttService: MqttService) {
    this.endpoint = 'events';
  }

  topic(): Observable<IMqttMessage> {
    // tslint:disable-next-line: prefer-const
    let topicName = '/output';
    return this.mqttService.observe(topicName);
  }
}
