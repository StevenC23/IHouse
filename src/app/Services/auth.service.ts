import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../Model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afa: AngularFireAuth) {}

  // tslint:disable-next-line: typedef
  createUser(email: string, pss: string) {
    return this.afa.createUserWithEmailAndPassword(email, pss);
  }

  // tslint:disable-next-line: typedef
  login(email: string, pss: string) {
    return this.afa.signInWithEmailAndPassword(email, pss);
  }

  // tslint:disable-next-line: typedef
  logout() {
    return this.afa.signOut();
  }

  // tslint:disable-next-line: typedef
  hasUser() {
    console.log(this.afa.authState);
    return this.afa.authState;
  }

  // tslint:disable-next-line: typedef
  isAuth() {
    this.afa.onAuthStateChanged((user) => {
      if (user) {
        return true;
      } else {
        return false;
      }
    });
  }
}
