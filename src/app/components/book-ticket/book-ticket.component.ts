import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { MoviesService, addMovie } from 'src/app/services/movies.service';

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css'],
  providers: [NgbActiveModal]
})
export class BookTicketComponent implements OnInit {
  bookTicketReceiveData!: addMovie;
  bookTicketForm!: FormGroup;
  isLoading!: boolean;
  error!: string;

  dummyBookTicketRecieveData: addMovie = { movieName: '', theatreName: '', noOfTickets: 0, releaseDate: new Date() };

  constructor(private movieService: MoviesService, private router: Router, config: NgbModalConfig, private modalService: NgbModal, private modalRef: NgbActiveModal) { }

  ngOnInit(): void {
    this.bookTicketReceiveData = this.movieService.bookTicketReqData;
    if (!this.bookTicketReceiveData) {
      this.router.navigate(['/movies']);
    }
    console.log(this.bookTicketReceiveData)
    if (this.bookTicketReceiveData) {

    }
    const { movieName, theatreName, noOfTickets, releaseDate } = this.bookTicketReceiveData ? this.bookTicketReceiveData : this.dummyBookTicketRecieveData;
    this.bookTicketForm = new FormGroup({
      'movieName': new FormControl(movieName),
      'theatreName': new FormControl(theatreName),
      'seats': new FormControl(noOfTickets),
      'releaseDate': new FormControl(releaseDate),
      'seatCount': new FormControl(null, [Validators.required, Validators.min(1)]),
      'seatNumbers': new FormControl('', [Validators.required, Validators.pattern('([0-9]+,?)+')])
    });
    this.isLoading = false;
    this.error = '';
  }

  get btfControls() {
    return this.bookTicketForm.controls;
  }

  onSubmit() {
    console.log(this.bookTicketForm);
  }
}
