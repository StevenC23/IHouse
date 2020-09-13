import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private authService: AuthService
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
      });
    }
  }

  ngOnInit(): void {}
}
