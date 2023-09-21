import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MoviesService]
    });
    service = TestBed.inject(MoviesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve actual movies count and method', () => {
    const dummyMovies = [
      {
        "_id": "64986dc5610ade815e05078c",
        "movieName": "Final Destination 1",
        "theatreName": "INOX",
        "noOfTickets": 80,
        "releaseDate": "2023-06-22T18:30:00.000Z",
        "seatNumber": [
          4,
          20
        ],
        "__v": 0,
        "status": "BOOKING OPEN"
      },
      {
        "_id": "6499f12426bdcaef503a7292",
        "movieName": "Inception",
        "theatreName": "PVR",
        "noOfTickets": 60,
        "releaseDate": "2023-06-26T18:30:00.000Z",
        "seatNumber": [
          2,
          34,
          50
        ],
        "__v": 0,
        "status": "BOOKING OPEN"
      },
      {
        "_id": "64ee5e9b990434e4b35d3c3d",
        "movieName": "Asur 2",
        "theatreName": "INOX",
        "noOfTickets": 10,
        "releaseDate": "2023-09-02T18:30:00.000Z",
        "seatNumber": [
          2,
          6
        ],
        "__v": 0,
        "status": "SOLD OUT"
      }
    ];
    service.getAllMovies().subscribe(movies => {
      expect(movies.length).toBe(3);
      expect(movies).toEqual(dummyMovies);
    });
    const request = httpMock.expectOne("http://localhost:8000/api/all");
    expect(request.request.method).toBe('GET');
    request.flush(dummyMovies);
  });

  it('should retrieve the searched movies', () => {
    const searchKeyword = 'Final';
    service.getSearchedMovies(searchKeyword).subscribe(movies => {
      let count = 0;
      movies.forEach(movie => {
        if (movie.movieName?.includes('Final'))
          count++;
      })
      expect(count).toEqual(1);
    });
    const request = httpMock.expectOne(`http://localhost:8000/api/movies/search/${searchKeyword}`);
    expect(request.request.method).toBe('GET');
  });
});
