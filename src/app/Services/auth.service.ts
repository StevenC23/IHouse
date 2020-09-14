import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

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
    return this.afa.authState;
  }
}
