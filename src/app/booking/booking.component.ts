import { Component,OnInit } from '@angular/core';
import { Booking } from './booking.model';
import { BookingStatusEnum } from '../constant.enum';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingDashboardComponent implements OnInit {
  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ){
  }

  bookingStatusEnum: { [key: string]: string } = BookingStatusEnum;

  search_key: any ;
  date: any;
  source: any;
  booking: Booking[]=[
    { emp_id: 'P123456', employee_name: 'Alvin Tan', date : '10/06/2023', timeSlot : '10:00am - 12:00pm', bookedStatus: 'B', fName: 'B6-A1', fType: 'Meeting Room', name : 'B6-A1-09', pos: '23', rotation:'D', status:'A'},
    { emp_id: 'P123456', employee_name: 'Alvin Tan', date : '10/06/2023', timeSlot : '10:00am - 12:00pm', bookedStatus: 'D', fName: 'B6-A1', fType: 'Meeting Room', name : 'B6-A1-09', pos: '23', rotation:'D', status:'D'},
    { emp_id: 'P123456', employee_name: 'Alvin Tan', date : '10/06/2023', timeSlot : '10:00am - 12:00pm', bookedStatus: 'D', fName: 'B6-A1', fType: 'Meeting Room', name : 'B6-A1-09', pos: '23', rotation:'D', status:'M'},
    { emp_id: 'P123456', employee_name: 'Alvin Tan', date : '10/06/2023', timeSlot : '10:00am - 12:00pm', bookedStatus: 'B', fName: 'B6-A1', fType: 'Meeting Room', name : 'B6-A1-09', pos: '23', rotation:'D', status:'A'},
    { emp_id: 'P123456', employee_name: 'Alvin Tan', date : '10/06/2023', timeSlot : '10:00am - 12:00pm', bookedStatus: 'B', fName: 'B6-A1', fType: 'Meeting Room', name : 'B6-A1-09', pos: '23', rotation:'D', status:'A'},
    { emp_id: 'P123456', employee_name: 'Alvin Tan', date : '10/06/2023', timeSlot : '10:00am - 12:00pm', bookedStatus: 'B', fName: 'B6-A1', fType: 'Meeting Room', name : 'B6-A1-09', pos: '23', rotation:'D', status:'A'},
    { emp_id: 'P123456', employee_name: 'Alvin Tan', date : '10/06/2023', timeSlot : '10:00am - 12:00pm', bookedStatus: 'B', fName: 'B6-A1', fType: 'Meeting Room', name : 'B6-A1-09', pos: '23', rotation:'D', status:'A'},

  ];

  ngOnInit(): void {

  }

  customSort(event:any):void{}
  
  clear(event:any):void{
    this.search_key = "";
    this.date = "";
  }

  getSeverity(event:string):string{
    return event === this.bookingStatusEnum['B'] ? 'success':'danger';
  }

  deleteBooking(event: any) {
    this.confirmationService.confirm({
        accept: () => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Booking has been deleted.' });
        }
    });
  }

}
