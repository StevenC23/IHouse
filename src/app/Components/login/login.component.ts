import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private builder: FormBuilder, private authService: AuthService) {
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
        })
        .catch(() => {
          alert('no es valido');
        });
    }
  }

  // tslint:disable-next-line: typedef
  logout() {
    this.authService.logout();
  }

  ngOnInit(): void {}
}
