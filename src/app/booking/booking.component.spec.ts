import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingDashboardComponent } from './booking.component';



describe('BookingComponent', () => {
  let component: BookingDashboardComponent;
  let fixture: ComponentFixture<BookingDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingDashboardComponent]
    });
    fixture = TestBed.createComponent(BookingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
