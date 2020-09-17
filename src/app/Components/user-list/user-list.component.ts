import { Component, OnInit } from '@angular/core';
import { User } from '../../Model/user';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  userList: User[];
  devicesList: any[];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.findUsers().subscribe((data) => {
      this.userList = data;
      this.devicesList = this.userList.map((user) => user.devices);
      console.log(this.devicesList);

      console.log(this.userList);
    });
  }
}
