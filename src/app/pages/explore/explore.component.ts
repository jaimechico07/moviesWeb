import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FilterMoviesComponent } from './filter-movies/filter-movies.component';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [RouterOutlet, FilterMoviesComponent],
  templateUrl: './explore.component.html',
})
export class ExploreComponent {}
