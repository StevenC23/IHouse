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

  constructor(private userService: UserService) {
    this.userService.findUsers().subscribe((data) => {
      this.userList = data;
      console.log(this.userList);
    });
  }

  ngOnInit(): void {}
}
