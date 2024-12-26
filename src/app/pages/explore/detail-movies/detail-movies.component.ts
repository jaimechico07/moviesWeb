import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThmdbService } from '../../../services/thmdb.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-movies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-movies.component.html',
})
export class DetailMoviesComponent {
  movie: any[] = [];
  movieId: string | null = null;
  movieDetails: any = null;
  loading: boolean = true;
  error: string | null = null;
  thmdbService = inject(ThmdbService);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('id');
    // Aquí puedes usar el id para buscar los detalles de la película
    if (this.movieId) {
      this.thmdbService
        .getMovieDetails(Number(this.movieId))
        .then((data) => {
          this.movieDetails = data;
          this.loading = false;
        })
        .catch((err) => {
          this.error = 'Error al cargar los detalles de la película';
          this.loading = false;
        });
    }
  }
}
