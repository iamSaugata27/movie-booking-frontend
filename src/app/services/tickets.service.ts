import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MoviesService } from './movies.service';

export interface bookTicketRespData {
  success: boolean,
  message: string
}

export interface bookTicketReqData {
  seatCount: number,
  seatNumbers: string
}

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private http: HttpClient, private movieService: MoviesService) { }

  bookTicket(reqTicket: bookTicketReqData): Observable<bookTicketRespData> {
    const moviename = this.movieService.bookTicketReqData.movieName;
    const movieId = this.movieService.bookTicketReqData.movieId;
    return this.http.post<bookTicketRespData>(`http://localhost:8000/api/${moviename}/add/${movieId}`, reqTicket, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
  }
}
