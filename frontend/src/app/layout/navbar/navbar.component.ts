import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { MenuItem, MessageService } from "primeng/api";
import { CognitoService } from 'src/app/cognito.service';
import { UserProfile } from 'src/app/models/profile.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'ic-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    visible: boolean = true;
    user?: UserProfile;
    items: MenuItem[] = [];
    isLoading: boolean = true;
    userMenuItems: MenuItem[] = [
      {
        label: 'My Profile',
        icon: 'pi pi-id-card',
        routerLink: '/profile',
        queryParams: {
          mode: 'self'
        }
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: (e) => this.signOut()
      }
    ];
  
    constructor(
      private router: Router, 
      private authenticationService: AuthenticationService,
      private messageService: MessageService,
      private cognitoService: CognitoService
    ) {}
  
    async ngOnInit(): Promise<void>{
      try {
        let userGrp = await this.cognitoService.getCurrentUserGroups(); 
        if (userGrp && userGrp.length > 0 && userGrp[0] == 'admin') {
          this.items.push(
            {
                label: 'Home',
                icon: 'pi pi-home',
                routerLink: '/home'
            },
            {
                label: 'Workspace',
                icon: 'pi pi-briefcase',
                items:[
                  {
                    label: 'Dashboard',
                    routerLink: '/workspaceDashboard'
                  },
                  {
                    label: 'Create Workspace',
                    routerLink: '/createWorkspace'
                  }
                ]
            },            
            {
                label: 'Booking',
                icon: 'pi pi-calendar-plus',
                routerLink: '/bookingDashboard'
            },
            {
              label: 'Manage User',
              icon: 'pi pi-users',
              routerLink: '/profileDashboard'
            }
          );
        } else {
          this.items.push(
            {
                label: 'Home',
                icon: 'pi pi-home',
                routerLink: '/home'
            },
            {
                label: 'Workspace',
                icon: 'pi pi-briefcase',
                routerLink: '/workspaceDashboard'
            },            
            {
                label: 'Booking',
                icon: 'pi pi-calendar-plus',
                routerLink: '/bookingDashboard'
            }
          );
        }
        this.isLoading = false;
      } catch (error) {
        console.error('Error fetching user data', error);
        this.isLoading = false;
      }
      
    }
  
    signOut(): void {
      this.cognitoService.signOut()
      .then(() => {
        this.messageService.add({
          severity: "success",
          summary: "Log out Successful",
          detail: "See you next time!",
          sticky: false,
      }); 
      this.router.navigate(['login']);
    });
    }
  
  
}