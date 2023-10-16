import { Component } from '@angular/core';
import { UserProfile } from 'src/app/models/profile.model';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-profile',
  templateUrl: './profile-dashboard.component.html',
  styleUrls: ['./profile-dashboard.component.scss']
})
export class ProfileDashboardComponent {
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
    private confirmationService: ConfirmationService, 
    private messageService: MessageService
  ){
    
  }

  ngOnInit(): void {

  }

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
