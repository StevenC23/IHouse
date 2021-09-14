import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login-pg',
  templateUrl: './login-pg.component.html',
  styleUrls: ['./login-pg.component.css'],
})
export class LoginPgComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
  }
}
