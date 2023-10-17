import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from '../booking.model';

@Component({
  selector: 'ic-create-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.scss']
})


export class EditBookingComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ){
    let details = this.router.getCurrentNavigation()?.extras.state;
    if (details) {
      this.booking.emp_id = details['emp_id'];
      this.booking.employee_name = details['employee_name'];
      this.booking.date = details['date'];
      this.booking.timeSlot = details['timeSlot'];
      this.booking.bookedStatus = details['bookedStatus'];
      this.booking.fName = details['fName'];
      this.booking.fType = details['fType'];
      this.booking.name = details['name'];
      this.booking.pos = details['pos'];
      this.booking.rotation = details['rotation'];
      this.booking.status = details['status'];
    }
  }

  booking!: Booking;
  mode: string = "";
    
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.mode = params['mode'];
      if (this.mode === 'view') {
        console.log('booking',this.booking);

      } else{
        
      }
    })
  }

}