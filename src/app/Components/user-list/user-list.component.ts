import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../Model/user';
import { UserService } from 'src/app/Services/User/user.service';
import { Subscription } from 'rxjs';
import { Device } from 'src/app/Model/device';
import { DeviceService } from 'src/app/Services/Device/device.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  iterator: number;
  userList: User[];
  devicesList: Device[];
  userSearch: User;
  userSearchForm: FormGroup;
  private subFindUsers: Subscription;

  constructor(
    private userService: UserService,
    private builder: FormBuilder,
    private deviceService: DeviceService
  ) {
    this.subFindUsers = this.userService.findUsers().subscribe((data) => {
      this.userList = data;
    });

    this.userSearchForm = this.builder.group({
      uSearch: ['', Validators.required],
    });
  }

  ngOnInit(): void {}
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {}

  userSearchM(values): void {
    this.deviceService.getDevicesByUser(values.uSearch).subscribe((gdbu) => {
      this.devicesList = gdbu;
    });
  }

  press(id: string): void {
    this.deviceService.deleteDeviceUser(id);
  }
}
