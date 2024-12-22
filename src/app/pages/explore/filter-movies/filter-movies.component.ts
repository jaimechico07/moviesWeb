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
  movies: any[] = [];
  genresMap: { [key: number]: string } = {};
  letters: string[] = ['All', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];
  selectedLetter: string = 'All';

  @Output() searchQueryChanged = new EventEmitter<string>();
  @Output() searchQueryGenre = new EventEmitter<number>();

  searchQuery: string = '';

  public thmdbService = inject(ThmdbService);

  async ngOnInit() {
    await this.loadGenres();
  }

  async loadGenres() {
    try {
      const response = await this.thmdbService.getGenreMovies();
      this.genres = Array.isArray(response) ? response : response.genres || [];
    } catch (error) {
      this.genres = [];
    }
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
