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
  profiles: UserProfile[];
  isLoading: boolean = true;
  searchKey: string;

  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private cognitoService: CognitoService
  ){

  }

  async ngOnInit(): Promise<void> {
    this.initData();
  }

  initData() {
    this.cognitoService.listUsers()
      .then((data) => {
        console.log(data);
        this.profiles = data.Users.map(userData => {
          const user: UserProfile = {} as UserProfile;
          userData.Attributes.forEach(attribute => {
            user[attribute.Name] = attribute.Value;
          });
          user.username = userData.Username;
          return user;
        });
        console.log('this profiles',this.profiles);
        this.isLoading = false;
      })
      .catch((error) => {
        console.error('Error listing users:', error);
        this.isLoading = false;
      });
  }

  clear(table: Table) {
    this.searchKey = "";
    table.clear();
  }

  applyFilterGlobal(table: Table, $event: Event, stringVal: string) {
    table.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  onClickProfile(mode: string, empDtls: UserProfile) {
    const queryParams = {
      mode: mode,
      username: empDtls.username
    }
    this.router.navigate(['/profile'], { queryParams });
  }

  async deleteProfile(profile: UserProfile) {
    if (profile.username) {
      try {
        const currUser = await this.cognitoService.getCurrentUser();
        if (currUser && currUser.username === profile.username) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Cannot delete own account' });
          return;
        }
        const data = await this.cognitoService.deleteUser(profile.username);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User Deleted' });
        this.initData();
      } catch (error) {
        this.messageService.add({ severity: 'error', summary: 'Unknown', detail: 'Please try again later.' });
      }
    }    
    
  }
}
