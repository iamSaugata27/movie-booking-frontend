import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { MoviesService, addMovie } from 'src/app/services/movies.service';


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit, OnDestroy {
  movies!: any[];
  isMovieSearched!: boolean;
  searchKey!: string;
  isLoggedIn!: boolean;
  isLoading!: boolean;

  constructor(private movieService: MoviesService, private authService: AuthService, config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.isLoading = false;
    this.authService.user.subscribe(userData => this.isLoggedIn = userData.isLoggedIn);

    this.movieService.movieSearch.subscribe(search => {
      this.isLoading = true;
      if (search.isMovieSearched) {
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
        this.movieService.getAllMovies().subscribe((respData: any[]) => {
          this.movies = respData;
          this.isLoading = false;
          console.log(this.movies);
        });
      }
    })
  }

  passToBookTicket(movieName: string, theatreName: string, noOfTickets: number, releaseDate: Date, movieId: string, content: any) {
    if (!this.isLoggedIn) {
      this.modalService.open(content);
      return;
    }
    const passToBookTicket: addMovie = { movieName, theatreName, noOfTickets, releaseDate, movieId };
    this.movieService.bookTicketReqData = passToBookTicket;
  }

  ngOnDestroy(): void {
    this.isMovieSearched = false;
    this.movieService.movieSearch.next({ isMovieSearched: false, searchKey: '' });
  }
}
