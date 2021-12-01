import Swal from 'sweetalert2';
import { MqttService } from 'ngx-mqtt';
import { ArtefactoService } from './../../ServicesBackend/artefacto.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Device } from 'src/app/Model/device';
import { DeviceService } from 'src/app/Services/Device/device.service';
import { Artefacto } from 'src/app/Model/artefacto';

@Component({
  selector: 'app-user-devices-list',
  templateUrl: './user-devices-list.component.html',
  styleUrls: ['./user-devices-list.component.css'],
})
export class UserDevicesListComponent implements OnInit {
  devicesList: Device[];
  artefactosListS: Artefacto[];
  artefactosListT: Artefacto[];
  artefactosListTL: Artefacto[];
  private subDevicesList: Subscription;

  constructor(
    private deviceService: DeviceService,
    private artefactoService: ArtefactoService,
    private mqtt: MqttService
    ) {}

  ngOnInit(): void {

    // this.subDevicesList = this.deviceService
    //   .getDevicesByUser(localStorage.getItem('email'))
    //   .subscribe((d) => {
    //     this.devicesList = d;
    //   });
    this.subDevicesList = this.artefactoService.consultarArtefactosPorUsuario(parseInt(localStorage.getItem('usuaId'))).subscribe(d=>{
      if(d){

        const filteredS = d.filter(function(element){
          return element.nombreTipoArtefacto == "Switch";
        });

        this.artefactosListS = filteredS;

        const filteredT = d.filter(function(element){
          return element.nombreTipoArtefacto == "Toma corriente";
        });

        this.artefactosListT = filteredT;

        const filteredTL = d.filter(function(element){
          return element.nombreTipoArtefacto == "Tira led";
        });

        this.artefactosListTL = filteredTL;

      }
    }, error => {
      let mensaje = error.error.error[0];
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: mensaje
      });
    })

  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    this.subDevicesList.unsubscribe();
  }

  sendmsg(device): void {
    let correo = localStorage.getItem('email');
    this.mqtt.unsafePublish(correo, "1", { qos: 1, retain: true });
  }

  sendmsgTL(device): void {
    let correo = localStorage.getItem('email');
    this.mqtt.unsafePublish(correo, "2", { qos: 1, retain: true });
  }

  sendmsgRosado(device): void {
    let correo = localStorage.getItem('email');
    this.mqtt.unsafePublish(correo, "3", { qos: 1, retain: true });
  }
  sendmsgAzul(device): void {
    let correo = localStorage.getItem('email');
    this.mqtt.unsafePublish(correo, "4", { qos: 1, retain: true });
  }
  sendmsgArcoiris(device): void {
    let correo = localStorage.getItem('email');
    this.mqtt.unsafePublish(correo, "5", { qos: 1, retain: true });
  }
}
