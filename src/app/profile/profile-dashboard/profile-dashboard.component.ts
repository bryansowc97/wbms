import { Component } from '@angular/core';
import { UserProfile } from 'src/app/models/profile.model';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CognitoService, IUser } from 'src/app/cognito.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile-dashboard.component.html',
  styleUrls: ['./profile-dashboard.component.scss']
})
export class ProfileDashboardComponent {
  // profiles: UserProfile[]=[
  //
  // ];

  profiles: UserProfile[]=[
    {
      // empID : 'P1234456',
      userName : 'P1234456',
      name : 'Alvin Tan',
      email : 'alvin.tan@wbms.com.sg',
      contact: '98765432',
      role: 'admin',
      status: '',
    },
    {
      // empID : 'P1234677',
      userName : 'P1234677',
      name : 'Alvin Lee',
      email : 'alvin.lee@wbms.com.sg',
      contact: '98765432',
      role: 'staff',
      status: '',
    },
    {
      // empID : 'P1234452',
      userName : 'P1234452',
      name : 'Alvin Chew',
      email : 'alvin.chew@wbms.com.sg',
      contact: '98765432',
      role: 'staff',
      status: '',
    },
    {
      // empID : 'P1234829',
      userName : 'P1234829',
      name : 'Alvin Lim',
      email : 'alvin.lim@wbms.com.sg',
      contact: '98765432',
      role: 'admin',
      status: '',
    }
  ];

  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private cognitoService: CognitoService
  ){

  }

  ngOnInit(): void {
    // this.getUserList();
  }

  // public getUserList(){
  //   const response = this.cognitoService.listUsers();
  //   const users = response.__zone_symbol__value.Users;
  //   console.log(users);
  //   this.profiles = users.map((user: any) => {
  //     return {
  //       userName: user.Attributes.find(attr => attr.Name === 'userName').Value,
  //       email: user.Attributes.find(attr => attr.Name === 'email').Value,
  //       name: user.Attributes.find(attr => attr.Name === 'name').Value,
  //     };
  //   });
  // }

  clear(table: Table) {
    table.clear();
  }

  applyFilterGlobal(table: Table, $event: Event, stringVal: string) {
    table.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  onClickProfile(mode: string, empDtls: UserProfile) {
    this.router.navigateByUrl(`/profile?mode=${mode}`, {state: empDtls});
  }

  deleteProfile() {
    this.confirmationService.confirm({
        accept: () => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Profile has been deleted.' });
        }
    });
  }
}
