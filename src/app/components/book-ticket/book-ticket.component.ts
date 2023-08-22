import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { MoviesService, addMovie } from 'src/app/services/movies.service';
import { TicketsService, bookTicketReqData, bookTicketRespData } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css'],
  providers: [NgbActiveModal, DatePipe]
})
export class BookTicketComponent implements OnInit {
  bookTicketReceiveData!: addMovie;
  bookTicketForm!: FormGroup;
  bookTicketResponse!: bookTicketRespData;
  isLoading!: boolean;
  error!: string;

  dummyBookTicketRecieveData: addMovie = { movieName: '', theatreName: '', noOfTickets: 0, releaseDate: new Date() };

  constructor(private movieService: MoviesService, private ticketService: TicketsService, private router: Router, config: NgbModalConfig, private modalService: NgbModal, private modalRef: NgbActiveModal, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.bookTicketReceiveData = this.movieService.bookTicketReqData;
    if (!this.bookTicketReceiveData) {
      this.router.navigate(['/movies']);
    }
    console.log(this.bookTicketReceiveData)
    const { movieName, theatreName, noOfTickets, releaseDate } = this.bookTicketReceiveData ? this.bookTicketReceiveData : this.dummyBookTicketRecieveData;
    this.bookTicketForm = new FormGroup({
      'movieName': new FormControl(movieName),
      'theatreName': new FormControl(theatreName),
      'seats': new FormControl(noOfTickets),
      'releaseDate': new FormControl(this.datePipe.transform(releaseDate, 'MMMM dd, yyyy')),
      'seatCount': new FormControl(null, [Validators.required, Validators.min(1)]),
      'seatNumbers': new FormControl('', [Validators.required, Validators.pattern('([0-9]+,?)+')])
    });
    this.isLoading = false;
    this.error = '';
  }

  get btfControls() {
    return this.bookTicketForm.controls;
  }

  onSubmit(content: any) {
    console.log(this.bookTicketForm);
    this.isLoading = true;
    const { seatCount, seatNumbers } = this.bookTicketForm.value;
    const reqTicket: bookTicketReqData = { seatCount, seatNumbers };
    this.ticketService.bookTicket(reqTicket).subscribe({
      next: bookingResp => {
        console.log(bookingResp);
        this.bookTicketResponse = bookingResp;
        this.isLoading = false;
        this.error = '';
      },
      error: errResp => {
        console.log(errResp);
        this.error = errResp.error.error;
        this.isLoading = false;
      }
    });
    this.modalRef = this.modalService.open(content, { centered: true });
  }

  ticketBooked() {
    this.modalRef.close();
    this.router.navigate(['/movies']);
  }
}
