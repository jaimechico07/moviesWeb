import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThmdbService {
  private readonly TMBD_API_KEY =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZWUxYjFlYzk5ZjM4Mzc1YWUwZDE2YmY3MjAzMmY1NSIsIm5iZiI6MTcyNTEyNDA1My45NjkwMDMsInN1YiI6IjY2NjM0NzBlNjBiNmNjNmZiYjA4YWQ1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W15jJYPBGbiGeOI_XdRzK6MRcfHH7cTqqm7D-qw5i3A';
  private readonly baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  // Método genérico para obtener datos del API
  fetchMovieData(endpoint: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.TMBD_API_KEY}`,
    });

    return this.http.get(`${this.baseUrl}/${endpoint}`, { headers });
  }

  getGenreMovies(): Observable<any> {
    return this.fetchMovieData(`/genre/movie/list`);
  }

  upComingMovies(page: number = 1, perPage: number = 20): Observable<any> {
    const url = page
      ? `/movie/upcoming?page=${page}&per_page=${perPage}`
      : `/movie/upcoming`;
    return this.fetchMovieData(url);
  }

  nowPlayingMovies(page: number = 1, perPage: number = 20): Observable<any> {
    const url = page
      ? `/movie/now_playing?page=${page}&per_page=${perPage}`
      : `/movie/now_playing`;
    return this.fetchMovieData(url);
  }

  trendingMovies(query: string, page?: number): Observable<any> {
    const url = page
      ? `/trending/movie/${query}?page=${page}`
      : `/trending/movie/${query}`;
    return this.fetchMovieData(url);
  }

  popularMovies(query: string): Observable<any> {
    return this.fetchMovieData(`/${query}/popular`);
  }

  topRatedMovies(): Observable<any> {
    return this.fetchMovieData(`/movie/top_rated`);
  }

  getMoviesAll(
    page: number = 1,
    perPage: number = 20,
    genreId?: number
  ): Observable<any> {
    const url = genreId
      ? `discover/movie?with_genres=${genreId}&page=${page}&per_page=${perPage}`
      : `discover/movie?page=${page}&per_page=${perPage}`;
    return this.fetchMovieData(url);
  }

  searchMovies(
    query: string,
    page: number = 1,
    perPage: number = 20
  ): Observable<any> {
    return this.fetchMovieData(
      `/search/movie?query=${query}&page=${page}&per_page=${perPage}`
    );
  }

  getMovieDetails(id: number): Observable<any> {
    return this.fetchMovieData(`movie/${id}`);
  }

  getTraillerMovie(id: number): Observable<any> {
    return this.fetchMovieData(`movie/${id}/videos`);
  }

  getCastsMovie(id: number): Observable<any> {
    return this.fetchMovieData(`movie/${id}/credits`);
  }
}
