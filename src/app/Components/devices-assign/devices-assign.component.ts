import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
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
  public subFindUsers: Subscription;
  public subFindDevices: Subscription;
  assignDeviceForm: FormGroup;

  constructor(
    private userService: UserService,
    private deviceService: DeviceService,
    private builder: FormBuilder
  ) {
    this.subFindUsers = this.userService.findUsers().subscribe((data) => {
      this.users = data;
    });

    this.subFindDevices = this.deviceService
      .findDevicesNotAssign()
      .subscribe((data) => {
        this.devices = data;
      });

    this.assignDeviceForm = this.builder.group({
      device: ['', Validators.required],
      email: ['', Validators.required],
      iplocal: ['', Validators.required],
    });
  }

  ngOnInit(): void {}
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    this.subFindUsers.unsubscribe();
    this.subFindDevices.unsubscribe();
  }

  // tslint:disable-next-line: typedef
  btnAssignDevice(values) {
    console.log(values.email);
    console.log(values.device);
    console.log(values.iplocal);
    this.deviceService.assignDeviceUser(
      values.email,
      values.device,
      values.iplocal
    );

    // tslint:disable-next-line: prefer-const
    // let devii = this.deviceService.getDevicesById(values.device);
    // console.log(devii);

    // devii.then((d) => {
    //   console.log(d);
    // });
    //
  }
}
