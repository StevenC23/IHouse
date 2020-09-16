import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.hasUser().subscribe((data) => {
      if (data) {
        console.log('logueado');
        this.router.navigate(['/home']);
      } else {
        console.log('deslogueado');
      }
    });
  }
}
