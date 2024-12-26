import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { IconsModule } from '../../../icons/icons.module';
import { ThmdbService } from '../../../services/thmdb.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-filter-movies',
  standalone: true,
  imports: [CommonModule, RouterLink, IconsModule, FormsModule],
  templateUrl: './filter-movies.component.html',
})
export class FilterMoviesComponent implements OnInit {
  isTendenciasVisible: boolean = false;
  isGenerosVisible: boolean = false;
  genres: any[] = [];
  genresMap: { [key: number]: string } = {};
  letters: string[] = ['All', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];
  selectedLetter: string = 'All';

  @Output() searchQueryChanged = new EventEmitter<string>();
  @Output() searchQueryGenre = new EventEmitter<number>();
  @Output() trendingClicked = new EventEmitter<string>();
  @Output() upComingClicked = new EventEmitter<string>();
  @Output() nowPlayingClicked = new EventEmitter<string>();
  searchQuery: string = '';

  public thmdbService = inject(ThmdbService);

  async ngOnInit() {
    await this.loadGenres();
  }

  loadGenres(): void {
    this.thmdbService.getGenreMovies().subscribe({
      next: (response) => {
        // Asegúrate de que la respuesta tiene la propiedad 'genres'
        if (response && response.genres) {
          this.genres = response.genres; // Accede a la propiedad 'genres'
        } else {
          this.genres = []; // Si no hay géneros, asigna un arreglo vacío
        }
      },
      error: (error) => {
        console.error('Error fetching genres', error);
        this.genres = []; // En caso de error, asigna un arreglo vacío
      },
    });
  }

  onSearch(query: string, type: 'name' | 'genre'): void {
    if (type === 'name') {
      this.searchQueryChanged.emit(query); // Emitir búsqueda por nombre
    } else if (type === 'genre') {
      const genreId = Number(query); // Convertir el género a número
      if (!isNaN(genreId)) {
        this.searchQueryGenre.emit(genreId); // Emitir búsqueda por género como número
        console.log(`Search genre ID: ${genreId}`);
      } else {
        console.error('El género proporcionado no es un número válido:', query);
      }
    }
  }

  onTrendingClick(period: string): void {
    this.searchQuery = '';
    this.trendingClicked.emit(period); // Emitir el evento al componente padre
  }

  onUpComingClick(listUpComing: string): void {
    this.searchQuery = '';
    this.upComingClicked.emit(listUpComing); // Emitir el evento al componente padre
  }

  onNowPlayingClick(nowPlaying: string): void {
    this.searchQuery = '';
    this.nowPlayingClicked.emit(nowPlaying); // Emitir el evento al componente padre
  }

  setSelectedLetter(letter: string): void {
    this.selectedLetter = letter;
    console.log(`Selected letter: ${letter}`);
  }

  toggleTendencias() {
    this.isTendenciasVisible = !this.isTendenciasVisible;
    this.isGenerosVisible = false;
  }

  toggleGeneros() {
    this.isGenerosVisible = !this.isGenerosVisible;
    this.isTendenciasVisible = false;
  }

  closeAllMenus() {
    this.isTendenciasVisible = false;
    this.isGenerosVisible = false;
  }
}
