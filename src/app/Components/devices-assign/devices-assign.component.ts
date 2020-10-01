import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Device } from 'src/app/Model/device';
import { User } from 'src/app/Model/user';
import { DeviceService } from 'src/app/Services/Device/device.service';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-devices-assign',
  templateUrl: './devices-assign.component.html',
  styleUrls: ['./devices-assign.component.css'],
})
export class DevicesAssignComponent implements OnInit {
  users: User[];
  devices: Device[];
  assignDeviceForm: FormGroup;

  constructor(
    private userService: UserService,
    private deviceService: DeviceService,
    private builder: FormBuilder
  ) {
    this.userService.findUsers().subscribe((data) => {
      this.users = data;
    });

    this.deviceService.findDevices().subscribe((data) => {
      this.devices = data;
    });

    this.assignDeviceForm = this.builder.group({
      device: ['', Validators.required],
      user: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  // tslint:disable-next-line: typedef
  btnAssignDevice(values) {
    console.log(values.user);
    console.log(values.device);
    this.userService.insertDeviceUser(values.user, values.device);
  }
}
