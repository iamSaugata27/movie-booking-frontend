import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

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
    return this.http.get<any[]>(`${environment.BASE_URL}/all`);
  }

  getSearchedMovies(searchKey: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.BASE_URL}/movies/search/${searchKey}`);
  }

  createMoviePoster(newMovie: addMovie): Observable<addMovieRespData> {
    return this.http.post<addMovieRespData>(`${environment.BASE_URL}/createmovieposter`, newMovie);
  }

  updateTicketStatus(moviename: string, movieId: string): Observable<{ message: string }> {
    return this.http.patch<{ message: string }>(`${environment.BASE_URL}/${moviename}/update/${movieId}`, {});
  }

  deleteMovie(moviename: string, movieId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${environment.BASE_URL}/${moviename}/delete/${movieId}`);
  }
}
