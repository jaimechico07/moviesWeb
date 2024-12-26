import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconsModule } from '../../icons/icons.module';
import { RouterLink } from '@angular/router';
import { SlugifyPipe } from '../../pipes/slugify.pipe';

import { ThmdbService } from '../../services/thmdb.service';
@Component({
  selector: 'app-card-movies',
  standalone: true,
  imports: [CommonModule, IconsModule, FormsModule, RouterLink, SlugifyPipe],
  templateUrl: './card-movies.component.html',
})
export class CardMoviesComponent implements OnInit {
  genres: any[] = [];
  genresMap: { [key: number]: string } = {};
  @Input() movies: any[] = [];

  constructor(private thmdbService: ThmdbService) {}

  ngOnInit(): void {
    this.loadGenres();
  }

  loadGenres(): void {
    this.thmdbService.getGenreMovies().subscribe({
      next: (response) => {
        // Asegúrate de que la respuesta tenga la propiedad 'genres'
        this.genres = Array.isArray(response)
          ? response
          : response.genres || [];

        // Mapear géneros a un objeto para un acceso rápido
        this.genresMap = this.genres.reduce((map, genre) => {
          map[genre.id] = genre.name;
          return map;
        }, {} as { [key: number]: string });
      },
      error: (error) => {
        console.error('Error cargando géneros:', error);
        this.genres = [];
        this.genresMap = {};
      },
    });
  }

  getGenreName(genreId: number): string {
    // Obtener el nombre del género o 'Desconocido' si no se encuentra
    return this.genresMap[genreId] || 'Desconocido';
  }
}
