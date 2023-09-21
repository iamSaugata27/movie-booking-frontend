import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { MoviesService, addMovie } from 'src/app/services/movies.service';


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
  providers: [NgbActiveModal]
})
export class MovieListComponent implements OnInit, OnDestroy {
  movies!: any[];
  isMovieSearched!: boolean;
  searchKey!: string;
  isLoggedIn!: boolean;
  isLoading!: boolean;
  role!: string | null;
  isActionLoading!: boolean;
  error!: string;
  upDelTicktResp!: string;

  constructor(private movieService: MoviesService, private authService: AuthService, config: NgbModalConfig, private modalService: NgbModal, private modalRef: NgbActiveModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.isLoading = false;
    this.authService.user.subscribe(userData => {
      this.isLoggedIn = userData.isLoggedIn;
      this.role = userData.role;
    });

    this.movieService.movieSearch.subscribe(search => {
      if (search.isMovieSearched) {
        this.isLoading = true;
        this.movieService.getSearchedMovies(search.searchKey).subscribe((respData: any[]) => {
          this.movies = respData;
          console.log(this.movies);
        });
        this.isMovieSearched = search.isMovieSearched;
        this.searchKey = search.searchKey;
        this.isLoading = false;
      }
      else {
        this.isMovieSearched = false;
        this.loadAllMovies();
      }
    })
  }

  loadAllMovies() {
    this.isLoading = true;
    this.movieService.getAllMovies().subscribe((respData: any[]) => {
      this.movies = respData;
      this.isLoading = false;
      console.log(this.movies);
    });
  }

  passToBookTicket(movieName: string, theatreName: string, noOfTickets: number, releaseDate: Date, movieId: string, content: any) {
    if (!this.isLoggedIn) {
      this.modalService.open(content);
      return;
    }
    const passToBookTicket: addMovie = { movieName, theatreName, noOfTickets, releaseDate, movieId };
    this.movieService.bookTicketReqData = passToBookTicket;
  }

  updateBookingStatus(moviename: string, movieId: string, content: TemplateRef<any>) {
    this.error = '';
    this.isActionLoading = true;
    this.movieService.updateTicketStatus(moviename, movieId).subscribe({
      next: updateResp => {
        this.upDelTicktResp = updateResp.message;
      },
      error: errResp => {
        this.error = errResp.error.error;
      }
    });
    this.isActionLoading = false;
    this.modalRef = this.modalService.open(content);
  }

  deleteMovie(moviename: string, movieId: string, content: TemplateRef<any>) {
    this.error = '';
    this.isActionLoading = true;
    this.movieService.deleteMovie(moviename, movieId).subscribe({
      next: delResp => {
        this.upDelTicktResp = delResp.message;
      },
      error: errResp => {
        this.error = errResp.error.error;
      }
    });
    this.isActionLoading = false;
    this.modalRef = this.modalService.open(content);
  }

  searchMovieQueryReset() {
    this.movieService.movieSearch.next({ isMovieSearched: false, searchKey: '' });
  }

  loadMoviesAfterUpDel() {
    this.modalRef.close();
    this.loadAllMovies();
  }

  ngOnDestroy(): void {
    this.isMovieSearched = false;
    this.movieService.movieSearch.next({ isMovieSearched: false, searchKey: '' });
  }
}
