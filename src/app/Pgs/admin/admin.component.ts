import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  logout() {

    console.log('Usuario deslogueado');
    localStorage.removeItem('email');
    localStorage.removeItem('rol');
    localStorage.removeItem('name');
    localStorage.removeItem('usuaId');
    this.router.navigate(['/login']);

    // this.authService
    //   .logout()
    //   .then(() => {
        
    //   })
    //   .catch(() => {
    //     Swal.fire("no se pudo desloguear");
    //   });
  }

  home(){
    this.router.navigate(['/home']);
  }
}
