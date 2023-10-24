import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from 'src/app/services/booking.service';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { formatDate } from '@angular/common';
import { Booking, BookingDtlDTO } from '../booking.model';
import { NFacilitySeat } from 'src/app/workspace/workspace.model';

@Component({
  selector: 'ic-create-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.scss']
})


export class EditBookingComponent {

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private workspaceService: WorkspaceService,
    private router: Router
  ){
    // this.booking = this.formBuilder.group({
    //   gp : ['', Validators.required],
    //   sub_gp : ['', [Validators.required]],
    //   status: ['', [Validators.required]],
    //   pos: ['', [Validators.required]],
    //   rotation: ['', [Validators.required]],
    //   name : ['', [Validators.required]],
    //   emp_id : ['', [Validators.required]],
    //   employee_name : ['', [Validators.required]],
    //   date : ['', [Validators.required]],
    //   timeSlot : ['', [Validators.required]],
    //   bookedStatus : ['', [Validators.required]]
    // });

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

  
  bookingDTL: BookingDtlDTO;
  mode: string = "";
  id: any;

  async ngOnInit(): Promise<void> {
    this.route.queryParams.subscribe(async params => {
      if (params) {
        this.mode = params['mode'];
        this.id = params['id'];
        
        
        this.bookingService.findById(this.id).subscribe( booked => {
          this.bookingDTL = booked;
          this.workspaceService.getWorkspaceById(booked.rescId).subscribe(r => {
            this.bookingDTL.facilityDTO = r;
            console.log('bookingDTL',this.bookingDTL);  
          });
        })
        

        
        if (this.mode === 'view') {
          
        }else{}
      }
      
    })
  }

  getSelectedTimeSlot(event:any){
    // this.booking.timeSlot = event.value;
  }

}