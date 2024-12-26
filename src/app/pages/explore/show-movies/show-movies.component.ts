import { Component, OnInit } from '@angular/core';
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
export class ShowMoviesComponent implements OnInit {
  movies: any[] = [];
  genres: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  perPage: number = 20;
  pageInput: number = 1;
  searchQuery: string = '';
  searchGenre: number = 0;
  searchPeriod: string = '';
  searchListUpComing: string = '';
  searchNowPlaying: string = '';

  constructor(private thmdbService: ThmdbService) {}

  ngOnInit(): void {
    this.loadMoviesWithFilters();
  }

  async loadMovies(
    query: string = '',
    genreId?: number,
    listTrending?: string,
    listUpComing?: string,
    nowPlaying?: string
  ) {
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
        const allMovies = await this.thmdbService.getMoviesAll(
          this.currentPage,
          this.perPage,
          genreId
        );
        data = {
          results: allMovies.results.filter((movie: any) =>
            movie.genre_ids.includes(genreId)
          ),
          total_pages: Math.min(allMovies.total_pages, 500),
        };
      } else if (listTrending) {
        // Cargar películas en tendencia
        data = await this.thmdbService.trendingMovies(
          listTrending,
          this.currentPage
        );
      } else if (listUpComing) {
        // Cargar películas en estreno
        data = await this.thmdbService.upComingMovies(
          this.currentPage,
          this.perPage
        );
      } else if (nowPlaying) {
        // Cargar películas ultimas publicadas
        data = await this.thmdbService.nowPlayingMovies(
          this.currentPage,
          this.perPage
        );
      } else {
        // Si no hay búsqueda, carga todas las películas
        data = await this.thmdbService.getMoviesAll(
          this.currentPage,
          this.perPage
        );
      }
      this.movies = data.results;
      console.log('Movies:', this.movies);
      this.totalPages = Math.min(data.total_pages, 500);
    } catch (error) {
      console.error('Error fetching Movies', error);
    }
  }

  onSearch(query: string) {
    this.resetFilters('query');
    this.searchQuery = query;
    this.loadMovies(this.searchQuery);
  }

  onSearchByGenre(genreId: number): void {
    this.resetFilters('genre');
    this.searchGenre = genreId;
    this.loadMovies('', this.searchGenre);
  }

  onTrendingClick(period: string): void {
    this.resetFilters('period');
    this.searchPeriod = period;
    this.loadMovies('', undefined, period);
  }

  onUpComingClick(listUpComing: string): void {
    this.resetFilters('upComing');
    this.searchListUpComing = listUpComing;
    this.loadMovies('', undefined, '', this.searchListUpComing);
  }

  onNowPlayingClick(nowPlaying: string): void {
    this.resetFilters('nowPlaying');
    this.searchNowPlaying = nowPlaying;
    this.loadMovies(
      '',
      undefined,
      '',
      this.searchListUpComing,
      this.searchNowPlaying
    );
  }

  nextPage() {
    if (this.currentPage < this.totalPages && this.currentPage < 500) {
      this.currentPage++;
      this.loadMoviesWithFilters();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadMoviesWithFilters();
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
      this.loadMoviesWithFilters();
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

  // Nueva función para manejar la carga de películas con filtros aplicados
  loadMoviesWithFilters() {
    if (this.searchGenre) {
      this.loadMovies('', this.searchGenre, '', ''); // Búsqueda por género
    } else if (this.searchQuery) {
      this.loadMovies(this.searchQuery); // Búsqueda por nombre
    } else if (this.searchPeriod) {
      // filtro por periodo day o week
      this.loadMovies('', undefined, this.searchPeriod, '');
    } else if (this.searchListUpComing) {
      // filtro de estreno
      this.loadMovies('', undefined, '', this.searchListUpComing);
    } else {
      this.loadMovies(
        '',
        undefined,
        '',
        this.searchListUpComing,
        this.searchNowPlaying
      );
    }
  }

  resetFilters(exclude: string): void {
    if (exclude !== 'query') this.searchQuery = '';
    if (exclude !== 'genre') this.searchGenre = 0;
    if (exclude !== 'period') this.searchPeriod = '';
    if (exclude !== 'upComing') this.searchListUpComing = '';
    if (exclude !== 'nowPlaying') this.searchNowPlaying = '';
    this.currentPage = 1; // Reiniciar la página siempre
  }
}
