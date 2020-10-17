import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../Model/user';
import { UserService } from 'src/app/Services/User/user.service';
import { Subscription } from 'rxjs';

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
  userSearchM(values) {
    this.iterator = 0;

    while (values.usearch !== this.userList[this.iterator].uid) {
      this.iterator = this.iterator + 1;
    }
    if (values.usearch === this.userList[this.iterator].uid) {
      this.userSearch = this.userList[this.iterator];
      console.log(this.userSearch);
    }
  }
}
