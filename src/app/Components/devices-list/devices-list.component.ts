import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Device } from 'src/app/Model/device';
import { DeviceService } from 'src/app/Services/Device/device.service';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css'],
})
export class DevicesListComponent implements OnInit {
  deviceList: Device[];
  public subFindDevices: Subscription;
  constructor(private deviceService: DeviceService) {
    this.subFindDevices = this.deviceService
      .findDevicesNotAssign()
      .subscribe((data) => {
        this.deviceList = data;
      });
  }

  ngOnInit(): void {}
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    console.log('ngOnDestroy');

    this.subFindDevices.unsubscribe();
  }

  // tslint:disable-next-line: typedef
  deleteDevice(id: string) {
    console.log(id);
    this.deviceService.deleteDevice(id);
  }
}
