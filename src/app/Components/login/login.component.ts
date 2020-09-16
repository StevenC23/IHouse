import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../Services/auth.service';
import { UserService } from 'src/app/Services/User/user.service';
import { User } from 'src/app/Model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userlist: User[];

  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    this.loginForm = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  btnLogin(values): void {
    if (this.loginForm.valid) {
      this.authService
        .login(values.email, values.password)
        .then(() => {
          console.log('Usuario correcto');
          this.router.navigate(['/home']);
          this.userService.findUsers().subscribe((data) => {
            // tslint:disable-next-line: prefer-for-of
            for (let index = 0; index < data.length; index++) {
              const element = data[index];
              console.log(element);
            }
            // localStorage.setItem('userType',this.userl
          });
        })
        .catch(() => {
          alert('no es valido');
        });
    }
  }

  ngOnInit(): void {}
}
