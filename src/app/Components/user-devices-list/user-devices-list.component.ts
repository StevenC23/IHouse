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
  artefactosList: Artefacto[];
  private subDevicesList: Subscription;

  constructor(
    private deviceService: DeviceService,
    private artefactoService: ArtefactoService,
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
        this.artefactosList = d;
      }
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
}
