import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [  CommonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit{


  constructor(public auth: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        // Redirect to the home page or any other desired page
        this.router.navigate(['/home']);
      }
    });
  }

  login() {
    this.auth.loginWithRedirect();
  }
}
