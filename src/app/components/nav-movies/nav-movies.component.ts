import { CommonModule} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconsModule } from '../../icons/icons.module';

// services
import { AuthService } from '@auth0/auth0-angular';
import { ThmdbService } from '../../services/thmdb.service';

@Component({
  selector: 'app-nav-movies',
  standalone: true,
  imports: [CommonModule, IconsModule, FormsModule],
  templateUrl: './nav-movies.component.html',
  styleUrl: './nav-movies.component.css'
})
export class NavMoviesComponent {
  isProfileVisible: boolean = false;
  isSearchVisible:  boolean = false;

  constructor(public auth: AuthService, private thmdbService: ThmdbService){}

  toggleProfileVisibility() {
    this.isProfileVisible = !this.isProfileVisible;
  }

  toggleSearchVisibility() {
    this.isSearchVisible = !this.isSearchVisible;
  }

  logout() {
    this.auth.logout();
  }



}
