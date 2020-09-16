import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css'],
})
export class RecommendationsComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

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
