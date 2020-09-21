import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // this.authService.hasUser().subscribe((data) => {
    //   if (data) {
    //     console.log('logueado, entra');
    //   } else {
    //     console.log('deslogueado, logueate porfavor');
    //     this.router.navigate(['/login']);
    //   }
    // });
  }
}
