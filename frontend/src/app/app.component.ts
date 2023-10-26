import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CognitoService } from './cognito.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit{

  title = 'WBMS';
  isAuthenticated: boolean;

  constructor(
    protected router: Router, 
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private cognitoService: CognitoService,
  ){
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

  public signOut(): void {
    this.cognitoService.signOut()
    .then(() => {
      this.router.navigate(['/signIn']);
    });
  }

}
