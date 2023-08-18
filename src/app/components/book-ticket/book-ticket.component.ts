import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService, addMovie } from 'src/app/services/movies.service';

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css']
})
export class BookTicketComponent implements OnInit {
  bookTicketReceiveData!: addMovie;

  constructor(private movieService: MoviesService, private router: Router) { }

  ngOnInit(): void {
    this.bookTicketReceiveData = this.movieService.bookTicketReqData;
    if (!this.bookTicketReceiveData)
      this.router.navigate(['/movies']);
    console.log(this.bookTicketReceiveData)
  }
}
