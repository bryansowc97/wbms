import { Component,OnInit } from '@angular/core';
import { CognitoService, IUser } from '../cognito.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  search_key: any ;
  date: any;
  source: any;
  loading: boolean;
  user: IUser;
  userGroup: any[];
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

  constructor(
    private cognitoService: CognitoService,
    private messageService: MessageService
  ){
    this.loading = false;
    this.user = {} as IUser;
  }

  ngOnInit(): void {
    this.cognitoService.getUser()
    .then((user: any) => {
      this.user = user.attributes;
      this.cognitoService.getUserGroups()
      .then((userGrp: any) => {
        this.userGroup = userGrp;
        this.messageService.add({
          severity: "warn",
          summary: "user info",
          detail: userGrp,
          sticky: false,
        }); 
        console.log("user, usergrp", user, this.userGroup);
      });      
    });
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
