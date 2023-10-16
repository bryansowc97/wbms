import { Component } from '@angular/core';
import { UserProfile } from '../models/profile.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from '../services/authentication.service';
import { HttpResponse } from '@angular/common/http';
import { CognitoService, IUser } from '../cognito.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // user: UserProfile = {} as UserProfile;
  // newPasswordRequired: boolean = false;
  // authenticationUser  = new BehaviorSubject(null);
  loading: boolean;
  user: IUser;
  isAuthenticated: boolean;

  constructor(
    private router: Router, 
    private authenticationService: AuthenticationService,
    private messageService: MessageService,
    private cognitoService: CognitoService
  ) {
    this.loading = false;
    this.user = {} as IUser;
      this.isAuthenticated = false;
  }

  ngOnInit(): void {
    this.cognitoService.isAuthenticated()
    .then((success: boolean) => {
      this.isAuthenticated = success;
    }).catch(() => {
      //help, failed to login
    });
  }

  public login(): void{
    this.loading = true;
    this.cognitoService.signIn(this.user).then((data)=>{
      this.messageService.add({
        severity: "success",
        summary: "Login Successful",
        detail: "Welcome to WBMS!",
        sticky: false,
      }); 
      this.router.navigate(['booking']);
    }).catch((error)=>{
      this.loading = false;
      this.messageService.add({
        severity: "warn",
        summary: "Login Failed!",
        detail: error.message,
        sticky: false,
      }); 
    })
  }

  public signUp(): void {
    this.router.navigate(['signUp']);
  }

  public signOut(): void {
    this.cognitoService.signOut()
    .then(() => {
      this.messageService.add({
        severity: "success",
        summary: "Log out Successful",
        detail: "See you next time!",
        sticky: false,
      }); 
      this.router.navigate(['login']);
      window.location.reload();      
    });
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
            this.router.navigate(['home']);
          }
          if(role === "Admin"){
            this.router.navigate(['home']);
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

  public testDb(): void{
    // this.authenticationService.testDb().subscribe(
    //   (res: any) => {
    //     if (res.status === 200) {
    //       let msg = res.body;
    //       this.messageService.add({
    //         severity: "success",
    //         summary: "Found in database",
    //         detail: "Login with id \n" + msg.employeeId + " and pw " + msg.password,
    //         sticky: false,
    //       }); 
    //     }
    //     else {
    //       this.messageService.add({
    //         severity: "error",
    //         summary: "u did something wrong",
    //         detail: "nothing found in db",
    //         sticky: true,
    //       }); 
    //     }        
    //   }
    // );
    this.cognitoService.listUsers()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error listing users:', error);
      });
  }

}


