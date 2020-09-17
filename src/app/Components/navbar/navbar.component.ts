import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  // tslint:disable-next-line: typedef
  logout() {
    this.authService
      .logout()
      .then(() => {
        console.log('Usuario deslogueado');
        localStorage.removeItem('email');
        localStorage.removeItem('rol');
        this.router.navigate(['/login']);
      })
      .catch(() => {
        alert('no se pudo desloguear');
      });
  }
}
