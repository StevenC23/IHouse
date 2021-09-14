import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  name: string;

  constructor(private authService: AuthService, private router: Router) {
    this.name = localStorage.getItem('name');
  }

  ngOnInit(): void {}

  logout() {
    this.authService
      .logout()
      .then(() => {
        console.log('Usuario deslogueado');
        localStorage.removeItem('email');
        localStorage.removeItem('rol');
        localStorage.removeItem('name');
        localStorage.removeItem('usuaId');
        this.router.navigate(['/login']);
      })
      .catch(() => {
        Swal.fire("no se pudo desloguear");
      });
  }
}
