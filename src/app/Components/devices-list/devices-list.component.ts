import { Component, OnInit } from '@angular/core';
import { Device } from 'src/app/Model/device';
import { DeviceService } from 'src/app/Services/Device/device.service';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css'],
})
export class DevicesListComponent implements OnInit {
  deviceList: Device[];
  constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.deviceService.findDevices().subscribe((data) => {
      this.deviceList = data;
      console.log(this.deviceList);
    });
  }

  // tslint:disable-next-line: typedef
  deleteDevice(id: string) {
    this.deviceService.deleteDevice(id);
  }
}
