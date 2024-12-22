import { Component, OnInit } from '@angular/core';
import { SwitchTabsComponent } from '../../../components/switch-tabs/switch-tabs.component';
import { CarouselComponent } from '../../../components/carousel/carousel.component';
import { ThmdbService } from '../../../services/thmdb.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-popular-movies',
  standalone: true,
  imports: [SwitchTabsComponent, CarouselComponent, FormsModule],
  templateUrl: './popular-movies.component.html',
})
export class PopularMoviesComponent implements OnInit {
  movies: any[] = [];
  query: string = 'movie';

  constructor(private thmdbService: ThmdbService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  async loadMovies() {
    try {
      const data = await this.thmdbService.popularMovies(this.query);
      this.movies = data.results;
    } catch (error) {
      console.error('Error fetching Movies', error);
    }
  }

  onTabSelected(tab: string) {
    this.query = tab; // Actualizar la consulta según la pestaña seleccionada
    this.loadMovies(); // Cargar las películas correspondientes
  }
}
