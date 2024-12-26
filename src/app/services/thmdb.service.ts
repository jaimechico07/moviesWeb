import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThmdbService {
  public async fetchMovieData(endpoint: string): Promise<any> {
    const TMBD_API_KEY =
      'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZWUxYjFlYzk5ZjM4Mzc1YWUwZDE2YmY3MjAzMmY1NSIsIm5iZiI6MTcyNTEyNDA1My45NjkwMDMsInN1YiI6IjY2NjM0NzBlNjBiNmNjNmZiYjA4YWQ1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W15jJYPBGbiGeOI_XdRzK6MRcfHH7cTqqm7D-qw5i3A';

    const response = await fetch(`https://api.themoviedb.org/3/${endpoint}`, {
      headers: {
        Authorization: 'Bearer ' + TMBD_API_KEY,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error response from Meal:', errorData);
      throw new Error(
        `Failed to fetch data from Meal: ${errorData.error.message}`
      );
    }

    return response.json();
  }

  public async getGenreMovies(): Promise<any> {
    return this.fetchMovieData(`/genre/movie/list`);
  }

  public async upComingMovies(
    page: number = 1,
    perPage: number = 20
  ): Promise<any> {
    const url = page
      ? `/movie/upcoming?page=${page}&per_page=${perPage}`
      : `/movie/upcoming`;
    return this.fetchMovieData(url);
  }

  public async nowPlayingMovies(
    page: number = 1,
    perPage: number = 20
  ): Promise<any> {
    const url = page
      ? `/movie/now_playing?page=${page}&per_page=${perPage}`
      : `/movie/now_playing`;
    return this.fetchMovieData(url);
  }

  public async trendingMovies(query: string, page?: number): Promise<any> {
    const url = page
      ? `/trending/movie/${query}?page=${page}`
      : `/trending/movie/${query}`;
    return this.fetchMovieData(url);
  }

  public async popularMovies(query: string): Promise<any> {
    return this.fetchMovieData(`/${query}/popular`);
  }

  public async topRatedMovies(): Promise<any> {
    return this.fetchMovieData(`/movie/top_rated`);
  }

  public async getMoviesAll(
    page: number = 1,
    perPage: number = 20,
    genreId?: number
  ): Promise<any> {
    const url = genreId
      ? `discover/movie?with_genres=${genreId}&page=${page}&per_page=${perPage}`
      : `discover/movie?page=${page}&per_page=${perPage}`;
    return this.fetchMovieData(url);
  }

  public async searchMovies(
    query: string,
    page: number = 1,
    perPage: number = 20
  ): Promise<any> {
    return this.fetchMovieData(
      `/search/movie?query=${query}&page=${page}&per_page=${perPage}`
    );
  }

  getMovieDetails(id: number): Promise<any> {
    return this.fetchMovieData(`movie/${id}`);
  }
}
