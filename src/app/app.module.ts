import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbDatepickerModule, NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { BookTicketComponent } from './components/book-ticket/book-ticket.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { AuthInterceptorInterceptor } from './shared/auth-interceptor.interceptor';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ViewUsersComponent } from './components/view-users/view-users.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    MovieListComponent,
    RegisterComponent,
    LoadingSpinnerComponent,
    AddMovieComponent,
    BookTicketComponent,
    BookingsComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    ViewUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbDatepickerModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
