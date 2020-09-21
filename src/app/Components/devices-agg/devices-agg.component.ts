import { DeviceService } from './../../Services/Device/device.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Device } from 'src/app/Model/device';

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
      id: ['', Validators.required],
      location: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  btnDevicesAgg(values): void {
    if (this.registerDeviceForm.valid) {
      this.device.id = values.id;
      this.device.location = values.location;
      this.device.name = values.name;
      this.deviceService.insertDevice(this.device);
      console.log('Dispositivo guardado en stock');
    }
  }

  ngOnInit(): void {
    const device = {} as Device;
    this.device = device;
  }
}
