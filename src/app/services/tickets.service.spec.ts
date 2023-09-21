import { TestBed } from '@angular/core/testing';

import { TicketsService } from './tickets.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { MoviesService } from './movies.service';

describe('TicketsService', () => {
  let service: TicketsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MoviesService, TicketsService]
    });
    service = TestBed.inject(TicketsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
