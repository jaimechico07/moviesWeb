import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThmdbService } from '../../../services/thmdb.service';

@Component({
  selector: 'app-hero-banner',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './hero-banner.component.html',
  styleUrl: './hero-banner.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeroBannerComponent implements OnInit {
  movies: any[] = [];

  constructor(private thmdbService: ThmdbService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  async loadMovies() {
    try {
      const data = await this.thmdbService.getMovies();
      this.movies = data.results;
    } catch (error) {
      console.error('Error fetching Movies', error);
    }
  }


}
