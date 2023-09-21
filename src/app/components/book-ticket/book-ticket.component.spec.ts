import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTicketComponent } from './book-ticket.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

describe('BookTicketComponent', () => {
  let component: BookTicketComponent;
  let fixture: ComponentFixture<BookTicketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgbModule, ReactiveFormsModule],
      declarations: [BookTicketComponent]
    });
    fixture = TestBed.createComponent(BookTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
