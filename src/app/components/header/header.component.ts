import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbNav, NgbNavItem } from '@ng-bootstrap/ng-bootstrap';
import { AuthService, User } from 'src/app/services/auth.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [NgbNavItem, NgbNav]
})
export class HeaderComponent implements OnInit {
  @ViewChild(NgbNav, { static: true })
  ngbNav!: NgbNav;
  token!: boolean;
  isLoggedIn!: boolean;
  role!: string | null;
  loginId!: string | null;
  searchValue!: string;
  addMovie = "add-movie";


  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router, private movieService: MoviesService) { }
  ngOnInit(): void {
    this.route.firstChild?.url.subscribe((url) => {
      // get url path
      const urlPath = url[url.length - 1]?.path;
      // select/set active tab
      this.ngbNav.select(urlPath);
    });
    // this.token = localStorage.getItem('token');
    // this.authService.isLoggedIn.subscribe((loggedIn: boolean) => {
    //   this.token = loggedIn;
    //   console.log(this.token);
    // })
    this.authService.user.subscribe((userData: User) => {
      this.isLoggedIn = userData.isLoggedIn;
      this.loginId = userData.loginId;
      this.role = userData.role;
    })
  }

  loggingOut() {
    this.authService.logout();
    //this.router.navigate(['/login']);
  }

  searchMovie() {
    console.log(this.searchValue);
    this.router.navigate(['/movies'], {
      relativeTo: this.route,
      queryParams: { searchKey: this.searchValue },
      queryParamsHandling: 'merge'
    });
    this.movieService.movieSearch.next({ isMovieSearched: true, searchKey: this.searchValue });
    this.searchValue = '';
  }

  searchMovieQueryReset() {
    this.movieService.movieSearch.next({ isMovieSearched: false, searchKey: '' });
  }
}
