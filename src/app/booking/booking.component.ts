import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  search_key: any ;
  date: any;
  source: any;
  booking: any[]=[
    {
      Ws_code : 'B6-A1-09',
      Emp_name : 'Alvin Tan',
      date : '10/06/2023',
      time : '10:00am - 12:00pm',
      status : 'BOOKED',
      action : 'edit'
    },
    {
      Ws_code : 'B6-A1-09',
      Emp_name : 'Alvin Tan',
      date : '10/06/2023',
      time : '10:00am - 12:00pm',
      status : 'CANCEL',
      action : 'edit'
    },
    {
      Ws_code : 'B6-A1-09',
      Emp_name : 'Alvin Tan',
      date : '10/06/2023',
      time : '10:00am - 12:00pm',
      status : 'unknown',
      action : 'edit'
    },
    {
      Ws_code : 'B6-A1-09',
      Emp_name : 'Alvin Tan',
      date : '10/06/2023',
      time : '10:00am - 12:00pm',
      status : 'SUCCESS',
      action : 'edit'
    }
  ];

  constructor(){
    
  }

  ngOnInit(): void {

  }

  customSort(event:any):void{}
  clear(event:any):void{
    this.search_key="";
  }

  getSeverity(event:string):string{
    return event === 'BOOKED' ? 'warning':
            event === 'CANCEL' ? 'danger':
            event === 'SUCCESS' ? 'success':
            'info';
  }

}
