import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThmdbService } from '../../../services/thmdb.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-banner',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './hero-banner.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeroBannerComponent implements OnInit {
  movies: any[] = [];

  constructor(private thmdbService: ThmdbService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.thmdbService.upComingMovies().subscribe({
      next: (data) => {
        this.movies = data.results;
      },
      error: (error) => {
        console.error('Error fetching Movies', error);
      },
    });
  }
}
