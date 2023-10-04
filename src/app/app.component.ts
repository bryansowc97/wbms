import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  items: MenuItem[]=[];
  
    ngOnInit() {
        this.items = [
            {
              label: "Home", 
              items: [
                {
                  label:"Home Page", icon: "pi pi-home" , routerLink: '/home'
                }
              ]
            },
            {
              
                label: "Manage Booking",
                items: [
                    {
                      label:"Booking", icon: "pi pi-home" , routerLink: '/booking'
                    },
                    { label: "create" },
                    { label: "edit" }
                ]
            },
            {
                label: "Manage Workspace",
                items: [
                    {  label:"Workspce", icon: "pi pi-home" , routerLink: '/workspace' }, 
                ]
            },
            {
              label: "Manage Profile",
              items: [
                  {  label:"Profile", icon: "pi pi-home" , routerLink: '/profile' }, 
                  
              ]
          }
        ];
    }
}
