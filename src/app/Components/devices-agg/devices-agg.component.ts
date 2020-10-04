import { DeviceService } from './../../Services/Device/device.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Device } from 'src/app/Model/device';
import * as uuid from 'uuid';
import { Router } from '@angular/router';

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
    private deviceService: DeviceService,
    private router: Router
  ) {
    this.registerDeviceForm = this.builder.group({
      id: [this.idAssign()],
      iplocal: ['Not Assign'],
      state: ['false', Validators.required],
      type: ['', Validators.required],
    });
  }

  idAssign(): string {
    return uuid.v4();
  }

  btnDevicesAgg(values): void {
    if (this.registerDeviceForm.valid) {
      this.device.id = values.id;
      this.device.iplocal = values.iplocal;
      this.device.state = values.state;
      this.device.type = values.type;
      this.deviceService.insertDevice(this.device);
      console.log('Dispositivo guardado en stock');
      this.router.navigate(['/admin/devices-stock/devices-list']);
    }
  }

  ngOnInit(): void {
    const device = {} as Device;
    this.device = device;
  }
}
