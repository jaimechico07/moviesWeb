import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { ExploreComponent } from './pages/explore/explore.component';

export const routes: Routes = [
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'explore', component: ExploreComponent},


  // {path: 'not-found', component: NotFoundComponent},
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'not-found' },
];
