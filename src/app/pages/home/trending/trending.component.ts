import { Component, OnInit } from '@angular/core';
import { SwitchTabsComponent } from '../../../components/switch-tabs/switch-tabs.component';
import { CarouselComponent } from '../../../components/carousel/carousel.component';
import { ThmdbService } from '../../../services/thmdb.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-trending',
  standalone: true,
  imports: [SwitchTabsComponent, CarouselComponent, FormsModule],
  templateUrl: './trending.component.html',
})
export class TrendingComponent implements OnInit {
  movies: any[] = [];
  query: string = 'day'; // Valor por defecto

  constructor(private thmdbService: ThmdbService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  async loadMovies() {
    try {
      const data = await this.thmdbService.trendingMovies(this.query);
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
