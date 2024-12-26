import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThmdbService } from '../../../services/thmdb.service';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from '../../../pipes/safeUrl.pipe';

@Component({
  selector: 'app-detail-movies',
  standalone: true,
  imports: [CommonModule, SafeUrlPipe],
  templateUrl: './detail-movies.component.html',
})
export class DetailMoviesComponent {
  movie: any[] = [];
  movieId: string | null = null;
  movieDetails: any = null;
  trailerUrl: string = '';
  cast: any[] = [];
  filteredCast: any[] = [];
  loading: boolean = true;
  genresMap: { [key: number]: string } = {};
  error: string | null = null;
  thmdbService = inject(ThmdbService);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('id');

    if (this.movieId) {
      this.fetchMovieDetailsAndTrailer(Number(this.movieId));
    }
  }

  private fetchMovieDetailsAndTrailer(id: number): void {
    this.thmdbService.getMovieDetails(id).subscribe({
      next: (details) => {
        this.movieDetails = details;
        console.log('Movie details:', this.movieDetails);
      },
      error: () => {
        this.error = 'Error al cargar los detalles de la película';
        this.loading = false;
      },
      complete: () => {
        // Obtener el trailer después de cargar los detalles
        this.thmdbService.getTraillerMovie(id).subscribe({
          next: (videos) => {
            const trailerVideo = videos.results.find(
              (video: any) =>
                video.type === 'Trailer' && video.site === 'YouTube'
            );
            if (trailerVideo) {
              this.trailerUrl = `https://www.youtube.com/embed/${trailerVideo.key}`;
            } else {
              // Manejar el caso cuando trailerUrl es null
              this.trailerUrl = ''; // o algún valor predeterminado
            }
          },
          error: () => {
            this.error = 'Error al cargar el trailer de la película';
          },
          complete: () => {
            this.loading = false;
          },
        });
      },
    });

    this.thmdbService.getCastsMovie(id).subscribe({
      next: (castData) => {
        this.cast = castData.cast;
        this.filteredCast = this.cast
          .filter((actor) => actor.profile_path !== null)
          .slice(0, 6);
      },
      error: () => {
        this.error = 'Error al cargar el elenco de la película';
      },
    });
  }

  convertRuntimeToHoursAndMinutes(runtime: number): string {
    const hours = Math.floor(runtime / 60); // Obtiene las horas
    const minutes = runtime % 60; // Obtiene los minutos restantes
    return `${hours}h ${minutes}m`;
  }

  convertirEntero(calicate: number): string {
    const vote = Math.floor(calicate);
    return `${vote}`;
  }
}
