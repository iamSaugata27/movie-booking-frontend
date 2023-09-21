import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { TicketsService, myBookings } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  bookedTicketsRespData!: myBookings[];
  bookedSeatNumbers!: string;
  loginId!: string;
  error!: string;
  isLoading!: boolean;
  constructor(private ticketService: TicketsService, config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = true;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.ticketService.getBookedTickets().subscribe({
      next: bookedTickets => {
        console.log(bookedTickets);
        this.isLoading = false;
        this.error = '';
        this.bookedTicketsRespData = bookedTickets;
      },
      error: errResp => {
        console.log(errResp);
        this.error = errResp.error.message;
        this.isLoading = false;
      }
    });
  }

  viewSeats(loginId: string, seatNumbers: number[], content: any) {
    this.loginId = loginId;
    this.bookedSeatNumbers = seatNumbers.join(',');
    this.modalService.open(content);
  }
}
