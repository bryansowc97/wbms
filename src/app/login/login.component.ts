import { Component } from '@angular/core';
import { UserProfile } from '../models/profile.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user: UserProfile = {} as UserProfile;
  newPasswordRequired: boolean = false;
  authenticationUser  = new BehaviorSubject(null);

  constructor(
    private router: Router, 
    private authenticationService: AuthenticationService,
    // private messageService: MessageService
  ) {}

  public login(): void{
    /*
    this.authenticationService.signIn(this.user).then((data)=>{
      this.authenticationUser.next(data);
      if (data.challengeName === 'NEW_PASSWORD_REQUIRED') {
        this.newPasswordRequired = true;
      } else {
        this.messageService.add({
          key:"confirm",
          severity: "success",
          summary: "Login Successful",
          detail: "Welcome to WBMS!",
          sticky: true,
        }); 
      }
    }).catch((error)=>{
      this.messageService.add({
        key:"error",
        severity: "warn",
        summary: "Login Failed!",
        detail: error,
        sticky: true,
      }); 
    })
    */
  }

  public updatePassword():void{
    /*
    this.authenticationUser.subscribe((value) =>{
      this.authenticationService.changeNewPassword(value, this.user.newPassword).then((data)=>{
        this.messageService.add({
          key:"confirm",
          severity: "success",
          summary: "Password Change Successful",
          detail: "Welcome to WBMS! ",
          sticky: true,
        }); 
      }).catch((error)=>{
        this.messageService.add({
          key:"error",
          severity: "warn",
          summary: "Password Change Failed!",
          detail: error,
          sticky: true,
        });
      })
    })
    */
  }

  
  onConfirm():void{
    // this.messageService.clear("confirm");
    /*
    this.authenticationService.getRole().then((role)=>{
      this.authenticationService.getFullName().then((name)=>{
          if(role === "Employee"){
            this.router.navigate(['/home']);
          }
          if(role === "Admin"){
            this.router.navigate(['/home']);
          }
      })
    }).catch((error)=>{
      this.messageService.add({
        key:"error",
        severity: "warn",
        summary: "Login Failed!",
        detail: error,
        sticky: true,
      });
    })
    */
  }
  onReject():void{
    // this.messageService.clear("error");
  }

}


