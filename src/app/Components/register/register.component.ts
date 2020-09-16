import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../Model/user';
import { UserService } from '../../Services/User/user.service';

import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  public user: User;

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.registerForm = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['', Validators.required],
      passwordd: ['', Validators.required],
    });
  }

  btnRegister(values): void {
    if (this.registerForm.valid) {
      this.authService.createUser(values.email, values.password).then(() => {
        console.log(values.email + ' ' + values.password);
        this.router.navigate(['/login']);
      });
      this.user.email = values.email;
      this.user.name = values.name;
      this.user.pss = values.password;
      this.user.rol = 'ADMIN';
      this.userService.insertUser(this.user);
    }
  }

  ngOnInit(): void {
    const user = {} as User;
    user.email = '';
    user.name = '';
    user.pss = '';
    user.rol = '';
    this.user = user;
  }
}
