import { Component,OnInit,Input } from '@angular/core';
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
export class CardMoviesComponent implements OnInit {
  genres: any[] = []; // Para almacenar los géneros
  genresMap: { [key: number]: string } = {};
  @Input() movies: any[] = [];
  // imageUrl = 'https://image.tmdb.org/t/p/w300';

  constructor(private thmdbService: ThmdbService){}

  async ngOnInit() {
    try {
      const response = await this.thmdbService.getGenreMovies();

      this.genres = Array.isArray(response) ? response : response.genres || [];

      this.genresMap = this.genres.reduce((map, genre) => {
        map[genre.id] = genre.name;
        return map;
      }, {} as { [key: number]: string });

    } catch (error) {
      this.genres = [];
    }
  }

  getGenreName(genreId: number): string {
    return this.genresMap[genreId] || 'Desconocido';
  }

  // async search() {
  //   if (this.query.trim() !== '') {
  //     try {
  //       const data = await this.thmdbService.searchMovies(this.query);
  //       this.movies = data.results;
  //       console.log(this.movies)
  //     } catch (error) {
  //       console.error('Error fetching search results', error);
  //     }
  //   }
  // }
}
