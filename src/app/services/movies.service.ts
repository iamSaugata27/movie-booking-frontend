import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface searchMovie {
  isMovieSearched: boolean,
  searchKey: string
}

export interface addMovie {
  movieName: string,
  theatreName: string,
  noOfTickets: number,
  releaseDate: Date,
  movieId?: string
}

export interface addMovieRespData {
  message: string,
  createdBy: string
}


@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  movieSearch = new BehaviorSubject<searchMovie>({} as searchMovie);
  bookTicketReqData!: addMovie;

  constructor(private http: HttpClient) { }

  getAllMovies(): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:8000/api/all");
  }

  getSearchedMovies(searchKey: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8000/api/movies/search/${searchKey}`);
  }

  createMoviePoster(newMovie: addMovie): Observable<addMovieRespData> {
    return this.http.post<addMovieRespData>('http://localhost:8000/api/createmovieposter', newMovie, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
  }
}
