import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit{

  title = 'WBMS';
  isAuthenticated: boolean = false;

  constructor(
    protected router: Router, 
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ){

  }
  
  
  ngOnInit(): void {
    const role = 'Admin'
    // this.authenticationService.getRole().then((role)=>{
      if(role){
        this.isAuthenticated = true;
      }
      else{
        this.isAuthenticated = false;
      }
    // });
  }

}
