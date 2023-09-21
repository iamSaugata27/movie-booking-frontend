import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MoviesService } from './movies.service';
import { environment } from 'src/environments/environment.development';

export interface bookTicketRespData {
  success: boolean,
  message: string
}

export interface bookTicketReqData {
  seatCount: number,
  seatNumbers: string
}

export interface myBookings {
  movieName: string,
  theatreName: string,
  releaseDate: Date,
  loginId: string,
  bookedSeats: number[]
}

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private http: HttpClient, private movieService: MoviesService) { }

  bookTicket(reqTicket: bookTicketReqData): Observable<bookTicketRespData> {
    const moviename = this.movieService.bookTicketReqData.movieName;
    const movieId = this.movieService.bookTicketReqData.movieId;
    return this.http.post<bookTicketRespData>(`${environment.BASE_URL}/${moviename}/add/${movieId}`, reqTicket);
  }

  getBookedTickets(): Observable<myBookings[]> {
    return this.http.get<myBookings[]>(`${environment.BASE_URL}/bookedtickets`);
  }
}
