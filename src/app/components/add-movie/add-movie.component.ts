import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbDateStruct, NgbDatepickerModule, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { MoviesService, addMovie, addMovieRespData } from 'src/app/services/movies.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css'],
  providers: [NgbActiveModal]
  // standalone: true,
  // imports: [NgbDatepickerModule]
})
export class AddMovieComponent implements OnInit {
  model!: NgbDateStruct;
  addMovieForm!: FormGroup;
  addMovieResponse!: addMovieRespData;
  placement = 'left';
  isLoading!: boolean;
  error!: string;

  constructor(private movieService: MoviesService, config: NgbModalConfig, private modalService: NgbModal, private modalRef: NgbActiveModal, private router: Router) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.addMovieForm = new FormGroup({
      'movieName': new FormControl('', [Validators.required]),
      'theatreName': new FormControl('', [Validators.required]),
      'seats': new FormControl(null, [Validators.required, Validators.min(10)]),
      'releaseDate': new FormControl('', [Validators.required, this.isDatePriorToThreeDays])
    });
    this.error = '';
    this.isLoading = false;
  }

  private isDatePriorToThreeDays(control: FormControl): { [key: string]: boolean } | null {
    // console.log(new Date(control.value.year, control.value.month - 1, control.value.day))
    // console.log(new Date(control.value.year, control.value.month - 1, control.value.day) < new Date(new Date().setDate(new Date().getDate() + 3)))
    // const { year, month, day } = control?.value;
    if (control?.value && new Date(control.value.year, control.value.month - 1, control.value.day) < new Date(new Date().setDate(new Date().getDate() + 3)))
      return { isDateLessFrmRequiredDate: true }
    return null;
  }

  get rfControls() {
    return this.addMovieForm.controls;
  }

  onSubmit(content: any) {
    console.log(this.addMovieForm.value);
    this.isLoading = true;
    const { movieName, theatreName, seats, releaseDate } = this.addMovieForm.value;
    const { year, month, day } = releaseDate;
    const newMovie: addMovie = { noOfTickets: seats, releaseDate: new Date(year, month - 1, day), movieName, theatreName };
    console.log(newMovie);
    this.movieService.createMoviePoster(newMovie).subscribe({
      next: respData => {
        console.log(respData);
        this.addMovieResponse = respData;
        this.error = '';
        this.isLoading = false;
      },
      error: errResp => {
        console.log(errResp);
        this.error = errResp.error.error;
        this.isLoading = false;
      }
    });
    this.modalRef = this.modalService.open(content, { centered: true });
  }

  movieAdded() {
    this.modalRef.close();
    this.router.navigate(['/movies']);
  }
}
