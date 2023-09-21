import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { RegisterComponent } from './components/register/register.component';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { adminGuard, authGuard } from './shared/auth.guard';
import { BookTicketComponent } from './components/book-ticket/book-ticket.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ViewUsersComponent } from './components/view-users/view-users.component';

const routes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  { path: "login", component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ChangePasswordComponent },
  { path: "movies", component: MovieListComponent, pathMatch: 'full' },
  { path: "add-movie", canActivate: [authGuard, adminGuard], component: AddMovieComponent },
  { path: "movies/:movieid/book-ticket", canActivate: [authGuard], component: BookTicketComponent },
  { path: "mybookings", canActivate: [authGuard], component: BookingsComponent },
  { path: "users", canActivate: [authGuard, adminGuard], component: ViewUsersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
