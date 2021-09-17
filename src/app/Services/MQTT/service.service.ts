import { Injectable } from '@angular/core';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private endpoint: string;

  constructor(
    private mqttService: MqttService,
    ) {
    this.endpoint = 'events';
  }

  topic(): Observable<IMqttMessage> {
    // tslint:disable-next-line: prefer-const
    let topicName = '/output';
    return this.mqttService.observe(topicName);
  }

  subscribeNewTopic(topic: string): void {
    console.log('Me subscribo al topico')
    this.mqttService.observe(topic).subscribe((message: IMqttMessage) => {
      console.log(message.payload.toString());
    });
    // this.logMsg('subscribed to topic: ' + this.topicname)
  }

  sendmsg(msg: string, topic: string): void {
    console.log("Envio mensaje");
    this.mqttService.unsafePublish(topic, msg, { qos: 1, retain: true });
  }
}
