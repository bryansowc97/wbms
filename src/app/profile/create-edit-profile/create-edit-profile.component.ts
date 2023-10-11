import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './create-edit-profile.component.html',
  styleUrls: ['./create-edit-profile.component.scss']
})
export class ProfileComponent {
  search_key: any;

  profiles: any[]=[
    {
      empId : 'P1234456',
      empName : 'Alvin Tan',
      empEmail : 'alvin.tan@wbms.com.sg'
    },
    {
      empId : 'P1234677',
      empName : 'Alvin Lee',
      empEmail : 'alvin.lee@wbms.com.sg'
    },
    {
      empId : 'P1234452',
      empName : 'Alvin Chew',
      empEmail : 'alvin.chew@wbms.com.sg'
    },
    {
      empId : 'P1234829',
      empName : 'Alvin Lim',
      empEmail : 'alvin.lim@wbms.com.sg'
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

}
