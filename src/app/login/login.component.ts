import { Component } from '@angular/core';
import { UserProfile } from '../models/profile.model';
import { BehaviorSubject, catchError, pipe, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { CognitoService, IUser } from '../cognito.service';
import { environment } from 'src/environment';
import { Auth } from 'aws-amplify';

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
    private cognitoService: CognitoService,
    private http: HttpClient
  ) {
    this.loading = false;
    this.user = {} as IUser;
      this.isAuthenticated = false;
  }

  ngOnInit(): void {
    this.cognitoService.isAuthenticated()
    .then(async (success: boolean) => {
      // this.isAuthenticated = success;
      // if (success) {
      //   this.router.navigate(['/bookingDashboard']);
      // }
      // Enforce signout if they went to login page
      await Auth.signOut();
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
      this.router.navigate(['bookingDashboard']);
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



  public testDb(): void{
    this.cognitoService.listUsers()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error listing users:', error);
      });
  }

  public testDb2(): void{
    this.authenticationService.testDb().subscribe(
      (res: any) => {
          let msg = res.body;
          this.messageService.add({
            severity: "success",
            summary: "Found in database",
            detail: msg,
            sticky: false,
          }); 
      }
    );
  }

}


