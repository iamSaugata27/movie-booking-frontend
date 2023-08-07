import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies!: any[];
  constructor(private movieService: MoviesService) { }
  ngOnInit(): void {
    this.movieService.getAllMovies().subscribe((respData: any[]) => {
      this.movies = respData;
      console.log(this.movies);
    });
  }
}
