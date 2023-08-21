import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { RegisterComponent } from './components/register/register.component';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { authGuard } from './shared/auth.guard';
import { BookTicketComponent } from './components/book-ticket/book-ticket.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: "movies", component: MovieListComponent, pathMatch: 'full' },
  { path: "add-movie", canActivate: [authGuard], component: AddMovieComponent },
  { path: "movies/:movieid/book-ticket", component: BookTicketComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
