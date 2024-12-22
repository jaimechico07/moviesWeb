import { Component } from '@angular/core';
import { NavMoviesComponent } from '../../components/nav-movies/nav-movies.component';
import { HeroBannerComponent } from './hero-banner/hero-banner.component';
import { TrendingComponent } from './trending/trending.component';
import { PopularMoviesComponent } from './popular-movies/popular-movies.component';
import { TopRatedComponent } from './top-rated/top-rated.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CopyrightComponent } from '../../components/copyright/copyright.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavMoviesComponent,
    HeroBannerComponent,
    TrendingComponent,
    PopularMoviesComponent,
    TopRatedComponent,
    FooterComponent,
    CopyrightComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
