import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/Model/user';
import { DeviceService } from 'src/app/Services/Device/device.service';
import { UserService } from 'src/app/Services/User/user.service';
// import '../../../assets/ResourcesJs/interactions';

@Component({
  selector: 'app-user-devices-list',
  templateUrl: './user-devices-list.component.html',
  styleUrls: ['./user-devices-list.component.css'],
})
export class UserDevicesListComponent implements OnInit {
  user: User;
  private subFindUserByEmail: Subscription;

  constructor(
    private userService: UserService,
    private deviceService: DeviceService
  ) {
    this.subFindUserByEmail = this.userService
      .findUserByEmail(localStorage.getItem('email'))
      .subscribe((data) => {
        this.user = data;
      });
  }

  ngOnInit(): void {}
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {}

  // tslint:disable-next-line: typedef
  clickk(id: string) {
    console.log('click ' + id);
    this.deviceService.changeStateDevice(id).subscribe((d) => {
      console.log(d);
    });
  }
}
