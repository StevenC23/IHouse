import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServiceService } from '../../Services/MQTT/service.service';
import { IMqttMessage } from 'ngx-mqtt';

@Component({
  selector: 'app-prueba-mqtt',
  templateUrl: './prueba-mqtt.component.html',
  styleUrls: ['./prueba-mqtt.component.css'],
})
export class PruebaMqttComponent implements OnInit {
  events: any[];
  private did: string;
  subscription: Subscription;

  constructor(private mqttservice: ServiceService) {}

  // tslint:disable-next-line: typedef
  ngOnInit() {
    // this.subscribeToTopic();
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // tslint:disable-next-line: typedef
  subscribeToTopic() {
    this.subscription = this.mqttservice
      .topic()
      .subscribe((data: IMqttMessage) => {
        // tslint:disable-next-line: prefer-const
        let item = JSON.parse(data.payload.toString());
        this.events.push(item);
      });
  }
}
