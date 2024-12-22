import { Routes } from '@angular/router';
import { ExploreComponent } from './explore.component';
import { ShowMoviesComponent } from './show-movies/show-movies.component';
import { FilterMoviesComponent } from './filter-movies/filter-movies.component';

export const exploreRoutes: Routes = [
  {
    path: '',
    component: ExploreComponent,
    children: [
      { path: '', redirectTo: 'show-movies', pathMatch: 'full' },
      { path: 'show-movies', component: ShowMoviesComponent },
      { path: 'filter-movies', component: FilterMoviesComponent },
    ],
  },
];
