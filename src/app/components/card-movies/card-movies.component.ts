import { Component } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconsModule } from '../../icons/icons.module';


import { ThmdbService } from '../../services/thmdb.service';
@Component({
  selector: 'app-card-movies',
  standalone: true,
  imports: [CommonModule, IconsModule, FormsModule],
  templateUrl: './card-movies.component.html',
  styleUrl: './card-movies.component.css'
})
export class CardMoviesComponent {
  query: string = '';
  movies: any[] = [];
  imageUrl = 'https://image.tmdb.org/t/p/w300';

  constructor(private thmdbService: ThmdbService){}


  async search() {
    if (this.query.trim() !== '') {
      try {
        const data = await this.thmdbService.searchMovies(this.query);
        this.movies = data.results;
        console.log(this.movies)
      } catch (error) {
        console.error('Error fetching search results', error);
      }
    }
  }
}
