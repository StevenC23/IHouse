import { DeviceService } from './../../Services/Device/device.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Device } from 'src/app/Model/device';
import * as uuid from 'uuid';

@Component({
  selector: 'app-devices-agg',
  templateUrl: './devices-agg.component.html',
  styleUrls: ['./devices-agg.component.css'],
})
export class DevicesAggComponent implements OnInit {
  registerDeviceForm: FormGroup;
  device: Device;

  constructor(
    private builder: FormBuilder,
    private deviceService: DeviceService
  ) {
    this.registerDeviceForm = this.builder.group({
      id: [uuid.v4()],
      iplocal: ['', Validators.required],
      state: ['false', Validators.required],
    });
  }

  btnDevicesAgg(values): void {
    if (this.registerDeviceForm.valid) {
      this.device.id = values.id;
      this.device.iplocal = values.iplocal;
      this.device.state = values.state;
      this.deviceService.insertDevice(this.device);
      console.log('Dispositivo guardado en stock');
    }
  }

  ngOnInit(): void {
    const device = {} as Device;
    this.device = device;
  }
}
