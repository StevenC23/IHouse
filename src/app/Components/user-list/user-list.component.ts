import { Component, OnInit } from '@angular/core';
import { User } from '../../Model/user';
import { UserService } from 'src/app/Services/User/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  userList: User[];
  private subFindUsers: Subscription;

  constructor(private userService: UserService) {
    this.subFindUsers = this.userService.findUsers().subscribe((data) => {
      this.userList = data;
    });
  }

  ngOnInit(): void {}
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    this.subFindUsers.unsubscribe();
  }
}
