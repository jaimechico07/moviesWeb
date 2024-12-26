import {
  Component,
  ElementRef,
  ViewChild,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
} from '@angular/core';
import { ThmdbService } from '../../../services/thmdb.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-top-rated',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './top-rated.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TopRatedComponent implements OnInit {
  movies: any[] = [];
  @ViewChild('swiperRef', { static: false }) swiperRef?: ElementRef;

  constructor(private thmdbService: ThmdbService) {}

  async ngOnInit() {
    this.loadMovies();
  }

  loadMovies(): void {
    this.thmdbService.topRatedMovies().subscribe({
      next: (data) => {
        this.movies = data.results;
      },
      error: (error) => {
        console.error('Error fetching Movies', error);
      },
    });
  }

  swiperParams = {
    spaceBetween: 10,
    loop: true,
    slidesPerView: 3,
    breakpoints: {
      640: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  };

  ngAfterViewInit() {
    const swiper = this.swiperRef?.nativeElement;
    Object.assign(swiper, this.swiperParams);
    swiper.initialize(); // Asegúrate de que esto esté correctamente configurado
  } // Inyección del servicio
}
