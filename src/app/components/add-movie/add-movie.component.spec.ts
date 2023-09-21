import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMovieComponent } from './add-movie.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbDatepicker, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

describe('AddMovieComponent', () => {
  let component: AddMovieComponent;
  let fixture: ComponentFixture<AddMovieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgbModule, ReactiveFormsModule],
      declarations: [AddMovieComponent]
    });
    fixture = TestBed.createComponent(AddMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
