import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from '../booking.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ic-create-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.scss']
})


export class EditBookingComponent {
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ){
    this.booking = this.formBuilder.group({
      fType : ['', Validators.required],
      fName : ['', [Validators.required]],
      status: ['', [Validators.required]],
      pos: ['', [Validators.required]],
      rotation: ['', [Validators.required]],
      name : ['', [Validators.required]],
      emp_id : ['', [Validators.required]],
      employee_name : ['', [Validators.required]],
      date : ['', [Validators.required]],
      timeSlot : ['', [Validators.required]],
      bookedStatus : ['', [Validators.required]]
    });

    // let details = this.router.getCurrentNavigation()?.extras.state;
    // if (details) {
    //   this.booking.emp_id = details['emp_id'];
    //   this.booking.employee_name = details['employee_name'];
    //   this.booking.date = details['date'];
    //   this.booking.timeSlot = details['timeSlot'];
    //   this.booking.bookedStatus = details['bookedStatus'];
    //   this.booking.fName = details['fName'];
    //   this.booking.fType = details['fType'];
    //   this.booking.name = details['name'];
    //   this.booking.pos = details['pos'];
    //   this.booking.rotation = details['rotation'];
    //   this.booking.status = details['status'];
    // }
  }

  booking: FormGroup;
  bookingDTL?: Booking;
  currdate = new Date();
  mode: string = "";
  timeSlot:any[] = [
    '08:00 - 09:00',
    '09:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '12:00 - 13:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00',
    '17:00 - 18:00',
    '18:00 - 19:00'
  ];
    
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.mode = params['mode'];
      if (this.mode === 'view') {
        console.log('booking',this.booking);

      } else{
        
      }
    })
  }

  getSelectedTimeSlot(event:any){
    // this.booking.timeSlot = event.value;
  }

}