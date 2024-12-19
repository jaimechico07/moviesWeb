import { Component, OnInit } from '@angular/core';
import { ThmdbService } from '../../services/thmdb.service';
import { CardMoviesComponent } from '../../components/card-movies/card-movies.component';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CardMoviesComponent, FormsModule],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.css',
})
export class ExploreComponent implements OnInit {
  movies: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  perPage: number = 20;
  pageInput: number = 1;
  constructor(private thmdbService: ThmdbService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  async loadMovies() {
    try {
      const data = await this.thmdbService.getMoviesAll(
        this.currentPage,
        this.perPage
      );
      this.movies = data.results;
      this.totalPages = data.total_pages;
    } catch (error) {
      console.error('Error fetching Movies', error);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadMovies();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadMovies();
    }
  }
  goToPage() {
    if (this.pageInput >= 1 && this.pageInput <= this.totalPages) {
      this.currentPage = this.pageInput;
      this.loadMovies();
    } else {
      setTimeout(() => {
        Swal.fire({
          title: 'Oops...',
          text: 'Número de Página Invalido',
          icon: 'error',
          draggable: true,
          timer: 3000, // O puedes omitir el `timer` para que no desaparezca automáticamente
        });
      }, 0);
    }
  }
}
