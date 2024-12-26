import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThmdbService } from '../../services/thmdb.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './carousel.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarouselComponent implements OnInit {
  genres: any[] = []; // Para almacenar los géneros
  genresMap: { [key: number]: string } = {};
  @Input() movies: any[] = []; // Recibe los datos de las películas
  @ViewChild('swiperRef', { static: false }) swiperRef?: ElementRef;

  constructor(private thmdbService: ThmdbService) {} // Inyección del servicio

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

        // Crear un mapa de géneros
        this.genresMap = this.genres.reduce((map, genre) => {
          map[genre.id] = genre.name;
          return map;
        }, {} as { [key: number]: string });
      },
      error: (error) => {
        console.error('Error fetching genres', error);
        this.genres = [];
        this.genresMap = {};
      },
    });
  }

  getGenreName(genreId: number): string {
    return this.genresMap[genreId] || 'Desconocido';
  }

  swiperParams = {
    spaceBetween: 30,
    loop: true,
    // autoplay: {
    //   delay: 1000,
    //   disableOnInteraction: false,
    // },
    // navigation: true,
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      560: {
        slidesPerView: 2,
      },
      640: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 4,
      },
      1024: {
        slidesPerView: 6,
      },
    },
  };

  ngAfterViewInit() {
    const swiper = this.swiperRef?.nativeElement;
    Object.assign(swiper, this.swiperParams);
    swiper.initialize(); // Asegúrate de que esto esté correctamente configurado
  }
}
