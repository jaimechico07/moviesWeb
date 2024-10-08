import { Injectable } from '@angular/core';
import axios from "axios";

@Injectable({
  providedIn: 'root'
})

export class ThmdbService {


  public async fetchMovieData(endpoint: string): Promise<any> {
    const TMBD_API_KEY='eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZWUxYjFlYzk5ZjM4Mzc1YWUwZDE2YmY3MjAzMmY1NSIsIm5iZiI6MTcyNTEyNDA1My45NjkwMDMsInN1YiI6IjY2NjM0NzBlNjBiNmNjNmZiYjA4YWQ1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W15jJYPBGbiGeOI_XdRzK6MRcfHH7cTqqm7D-qw5i3A'


    const response = await fetch(`https://api.themoviedb.org/3/${endpoint}`, {
      headers: {
        'Authorization': 'Bearer ' + TMBD_API_KEY
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error response from Meal:', errorData);
      throw new Error(`Failed to fetch data from Meal: ${errorData.error.message}`);
    }

    return response.json();
  }

  public async searchMovies(query: string): Promise<any> {
    return this.fetchMovieData(`/search/multi?query=${query}`);
  }

}
