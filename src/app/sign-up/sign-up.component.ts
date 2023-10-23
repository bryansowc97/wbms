import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { IUser, CognitoService } from '../cognito.service';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {

  loading: boolean;
  isConfirm: boolean;
  user: IUser;
  roles:any[] =[
    { value:'admin', label: 'Admin'},
    { value:'staff', label: 'Staff'}
  ];

  constructor(
    private router: Router,
    private cognitoService: CognitoService,
    private messageService: MessageService,
    private authService: AuthenticationService
    ) {
    this.loading = false;
    this.isConfirm = false;
    this.user = {} as IUser;
  }

  public signUp(): void {
    // to add validations here
    this.user.contact = this.authService.validatePhoneNum(this.user.contact);
    if (this.user.contact == '') {
      this.messageService.add({ severity: 'error', summary: 'Wrong contact format', detail: 'Try again' });
      return;
    }
    if (!this.authService.validateEmail(this.user.email)) {
      this.messageService.add({ severity: 'error', summary: 'Wrong email format', detail: 'Try again' });
      return;
    }
    if (!this.authService.validatePassword(this.user.password, this.user.confirmPassword)) {
      this.messageService.add({ severity: 'error', summary: 'Passwords do not match', detail: 'Try again' });
      return;
    }
    // api
    this.loading = true;
    this.cognitoService.signUp(this.user)
    .then(() => {
      this.loading = false;
      this.isConfirm = true;
      this.cognitoService.getCurrentUser().then((data) => {
        if (this.cognitoService.isAuthenticated && data !== null && data) {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Account created.' });
          this.router.navigate(['/profileDashboard']);
        }
        else {this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Account created. Please Login.' });
          this.router.navigate(['/login']);
        }
      })
      
    }).catch(() => {
      this.loading = false;
      this.messageService.add({ severity: 'error', summary: 'Unknown', detail: 'Please try again later.' });
    });
  }

}
