import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsComponent } from './bookings.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoadingSpinnerComponent } from 'src/app/shared/loading-spinner/loading-spinner.component';

describe('BookingsComponent', () => {
  let component: BookingsComponent;
  let fixture: ComponentFixture<BookingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingsComponent, LoadingSpinnerComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(BookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
