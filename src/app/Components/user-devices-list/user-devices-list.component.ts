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
        console.log(d);

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

        console.log(this.artefactosListS);
        console.log(this.artefactosListT);
        console.log(this.artefactosListTL);

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

  // tslint:disable-next-line: typedef
  clickk(id: string) {
    console.log('click ' + id);
    // this.deviceService.changeStateDevice(id).subscribe((d) => {
    //   console.log(d);
    // });
  }

  sendmsg(device): void {
    let correo = localStorage.getItem('email');
    console.log("Envio mensaje");
    console.log(correo+"/"+device.codigo+"/"+device.url);
    this.mqtt.unsafePublish(correo+"/"+device.codigo+"/"+device.url, "1", { qos: 1, retain: true });
  }
}
