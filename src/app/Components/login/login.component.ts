import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private builder: FormBuilder) {
    this.loginForm = this.builder.group({
      user: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  btnLogin(values): void {
    console.log(values);
  }

  ngOnInit(): void {}
}
