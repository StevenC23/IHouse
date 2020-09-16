import { Injectable } from '@angular/core';
import { User } from '../../Model/user';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  public findUsers(): Observable<User[]> {
    return this.db
      .collection('users')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data() as User;
            return data;
          });
        })
      );
  }
}
