import { Injectable } from '@angular/core';
import { User } from '../../Model/user';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFirestore) {}

  selecUser: User = new User();

  // tslint:disable-next-line: typedef
  insertUser(user: User): void {
    this.db
      .collection('users')
      .add(user)
      .catch((err) => console.log(err));
  }
}
