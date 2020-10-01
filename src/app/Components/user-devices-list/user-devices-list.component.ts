import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Model/user';
import { UserService } from 'src/app/Services/User/user.service';
// import '../../../assets/ResourcesJs/interactions';

@Component({
  selector: 'app-user-devices-list',
  templateUrl: './user-devices-list.component.html',
  styleUrls: ['./user-devices-list.component.css'],
})
export class UserDevicesListComponent implements OnInit {
  user: User;

  constructor(private userService: UserService) {
    this.userService
      .findUserByEmail(localStorage.getItem('email'))
      .subscribe((data) => {
        this.user = data;
        console.log(this.user);
      });
  }

  ngOnInit(): void {}

  // tslint:disable-next-line: typedef
  clickk(id: string) {
    console.log('click ' + id);
  }
}
