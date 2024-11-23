import { Component , OnInit} from '@angular/core';
import { ThmdbService } from '../../services/thmdb.service';
import { CardMoviesComponent } from '../../components/card-movies/card-movies.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CardMoviesComponent,FormsModule],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.css'
})
export class ExploreComponent implements OnInit {
  movies: any[] = [];
  constructor(private thmdbService: ThmdbService){}

  ngOnInit(): void {
    this.loadMovies();
  }

  async loadMovies() {
    try {
      const data = await this.thmdbService.getMoviesAll();
      this.movies = data.results;
      console.log(this.movies)
    } catch (error) {
      console.error('Error fetching Movies', error);
    }
  }

}
