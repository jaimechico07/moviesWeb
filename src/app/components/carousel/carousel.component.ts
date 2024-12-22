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

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './carousel.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarouselComponent implements OnInit {
  genres: any[] = []; // Para almacenar los géneros
  genresMap: { [key: number]: string } = {};
  @Input() movies: any[] = []; // Recibe los datos de las películas
  @ViewChild('swiperRef', { static: false }) swiperRef?: ElementRef;

  constructor(private thmdbService: ThmdbService) {} // Inyección del servicio

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

  swiperParams = {
    spaceBetween: 30,
    loop: true,
    // autoplay: {
    //   delay: 1000,
    //   disableOnInteraction: false,
    // },
    slidesPerView: 1,
    breakpoints: {
      640: {
        slidesPerView: 2,
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
