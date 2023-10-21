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
  
    ngOnInit(): void {
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
                    routerLink: '/createWorkspace',
                    queryParams: {
                      mode: 'create'
                    }
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
        /*
      this.authenticationService.getUserDetails().then((res:IUser) => {
        let actions: MenuItem[] = [];
        let homelink: string = '';
  
        this.user = res;
        if (res) {
          if (res.role === 'Admin') {
            homelink = '/admin/home';
            actions = [
              {
                label: 'Manage Schools',
                icon: 'pi pi-building',
                routerLink: '/admin/manage-school'
              },
              {
                label: 'Manage Users',
                icon: 'pi pi-users',
                routerLink: '/admin/manage-user'
              },
            ];
          }
          else if (res.role === 'Student or Parent') {
            homelink = '/studentparent/home';
            actions = [
              {
                label: 'School Recommendations',
                icon: 'pi pi-thumbs-up',
                routerLink: '/studentparent/upload-results'
              },
              {
                label: 'View Schools',
                icon: 'pi pi-database',
                routerLink: '/studentparent/view-school-dashboard'
              }
            ];
          }
          else if (res.role === 'School Admin') {
            homelink = '/schooladmin/home';
            actions = [
              {
                label: 'Manage My Schools',
                icon: 'pi pi-building',
                routerLink: '/schooladmin/manage-school-dashboard'
              }
            ];
          }
  
          // Add common navigations
          this.items.push({
            label: 'Home',
            icon: 'pi pi-home',
            routerLink: homelink
          });
          this.items.push(...actions);
  
          // Refreshes the available buttons
          this.visible = false;
          setTimeout(() => this.visible = true, 0);
        }
      });
      */
  
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