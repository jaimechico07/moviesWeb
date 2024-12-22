import { Component } from '@angular/core';
import { ThmdbService } from '../../../services/thmdb.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CardMoviesComponent } from '../../../components/card-movies/card-movies.component';
import { CommonModule } from '@angular/common';
import { FilterMoviesComponent } from '../filter-movies/filter-movies.component';

@Component({
  selector: 'app-show-movies',
  standalone: true,
  imports: [
    CardMoviesComponent,
    FormsModule,
    CommonModule,
    FilterMoviesComponent,
  ],
  templateUrl: './show-movies.component.html',
})
export class ShowMoviesComponent {
  movies: any[] = [];
  genres: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  perPage: number = 20;
  pageInput: number = 1;
  searchQuery: string = '';
  searchGenre: number = 0;

  constructor(private thmdbService: ThmdbService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  async loadMovies(query: string = '', genreId?: number) {
    try {
      let data;
      if (query.trim()) {
        // Búsqueda por nombre
        data = await this.thmdbService.searchMovies(
          query,
          this.currentPage,
          this.perPage
        );
      } else if (genreId != null) {
        // Búsqueda por género
        const allMovies = await this.thmdbService.getMoviesByGenre(
          genreId,
          this.currentPage,
          this.perPage
        );
        console.log('All Movies:', allMovies);
        data = {
          results: allMovies.results.filter((movie: any) =>
            movie.genre_ids.includes(genreId)
          ),
          total_pages: Math.min(allMovies.total_pages, 500),
        };
      } else {
        // Si no hay búsqueda, carga todas las películas
        data = await this.thmdbService.getMoviesAll(
          this.currentPage,
          this.perPage
        );
      }
      this.movies = data.results;
      this.totalPages = Math.min(data.total_pages, 500);
    } catch (error) {
      console.error('Error fetching Movies', error);
    }
  }

  async onSearch(query: string) {
    this.searchQuery = query;
    this.currentPage = 1;
    this.loadMovies(this.searchQuery);
  }

  onSearchByGenre(genreId: number): void {
    this.searchGenre = genreId;
    this.currentPage = 1;
    this.loadMovies('', genreId);
  }

  nextPage() {
    if (this.currentPage < this.totalPages && this.currentPage < 500) {
      this.currentPage++;
      // Verifica si hay un genreId seleccionado, si es así, pasa el genreId
      if (this.searchGenre) {
        this.loadMovies('', this.searchGenre); // Búsqueda por género
      } else {
        this.loadMovies(this.searchQuery); // Búsqueda por nombre
      }
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      // Verifica si hay un genreId seleccionado, si es así, pasa el genreId
      if (this.searchGenre) {
        this.loadMovies('', this.searchGenre); // Búsqueda por género
      } else {
        this.loadMovies(this.searchQuery); // Búsqueda por nombre
      }
    }
  }

  goToPage() {
    // Asegúrate de que la página esté entre 1 y 500
    if (
      this.pageInput >= 1 &&
      this.pageInput <= this.totalPages &&
      this.pageInput <= 500
    ) {
      this.currentPage = this.pageInput;
      // Verifica si hay un genreId seleccionado, si es así, pasa el genreId
      if (this.searchGenre) {
        this.loadMovies('', this.searchGenre); // Búsqueda por género
      } else {
        this.loadMovies(this.searchQuery); // Búsqueda por nombre
      }
    } else {
      setTimeout(() => {
        Swal.fire({
          title: 'Oops...',
          text: 'Número de Página Invalido',
          icon: 'error',
          draggable: true,
          timer: 3000,
        });
      }, 0);
    }
  }
}
