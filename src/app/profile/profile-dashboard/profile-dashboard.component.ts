import { Component } from '@angular/core';
import { UserProfile } from 'src/app/models/profile.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile-dashboard.component.html',
  styleUrls: ['./profile-dashboard.component.scss']
})
export class ProfileDashboardComponent {
  search_key: any;

  profiles: UserProfile[]=[
    {
      empID : 'P1234456',
      fullname : 'Alvin Tan',
      email : 'alvin.tan@wbms.com.sg',
      contact: '98765432',
      role: 'admin',
      status: '',
    },
    {
      empID : 'P1234677',
      fullname : 'Alvin Lee',
      email : 'alvin.lee@wbms.com.sg',
      contact: '98765432',
      role: 'staff',
      status: '',
    },
    {
      empID : 'P1234452',
      fullname : 'Alvin Chew',
      email : 'alvin.chew@wbms.com.sg',
      contact: '98765432',
      role: 'staff',
      status: '',
    },
    {
      empID : 'P1234829',
      fullname : 'Alvin Lim',
      email : 'alvin.lim@wbms.com.sg',
      contact: '98765432',
      role: 'admin',
      status: '',
    }
  ];

  constructor(
    private router: Router,
  ){
    
  }

  ngOnInit(): void {

  }

  customSort(event:any):void{}

  clear(event:any):void{
    this.search_key="";
  }

  onClickProfile(mode: string, empDtls: UserProfile) {
    this.router.navigateByUrl(`/profile?mode=${mode}`, {state: empDtls});
  }
}
