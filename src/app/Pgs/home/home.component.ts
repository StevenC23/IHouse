import { MqttService, IMqttMessage } from 'ngx-mqtt';
import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { ServiceService } from 'src/app/Services/MQTT/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  name: string;
  codigo: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private mqtt: MqttService
    ) {
    this.name = localStorage.getItem('name');
    this.codigo = localStorage.getItem('email');
  }

  ngOnInit(): void {
    this.subscribeNewTopic(this.codigo);
  }

  logout() {

    localStorage.removeItem('email');
    localStorage.removeItem('rol');
    localStorage.removeItem('name');
    localStorage.removeItem('usuaId');
    this.router.navigate(['/login']);
  }

  subscribeNewTopic(topic: string): void {
    this.mqtt.observe(topic).subscribe((message: IMqttMessage) => {
    });
  }
}
