import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../Model/user';
import { UserService } from 'src/app/Services/User/user.service';
import { Subscription } from 'rxjs';
import { Device } from 'src/app/Model/device';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  iterator: number;
  userList: User[];
  userSearch: User;
  userSearchForm: FormGroup;
  private subFindUsers: Subscription;

  constructor(private userService: UserService, private builder: FormBuilder) {
    this.subFindUsers = this.userService.findUsers().subscribe((data) => {
      this.userList = data;
    });

    this.userSearchForm = this.builder.group({
      usearch: ['', Validators.required],
    });
  }

  ngOnInit(): void {}
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    this.subFindUsers.unsubscribe();
  }
  // tslint:disable-next-line: typedef
  userSearchM(values) {
    this.subFindUsers = this.userService.findUsers().subscribe((data) => {
      this.userList = data;

      this.iterator = 0;

      while (values.usearch !== this.userList[this.iterator].uid) {
        this.iterator = this.iterator + 1;
      }
      if (values.usearch === this.userList[this.iterator].uid) {
        this.userSearch = this.userList[this.iterator];
        console.log(this.userSearch);
      }
    });
  }

  // tslint:disable-next-line: typedef
  press(idU: string, uidU: string, idD: string, type: string) {
    this.userService.deleteDeviceByUser(idU, uidU, idD);
  }
}
