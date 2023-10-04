import { Component, OnInit } from '@angular/core';
import { MegaMenuItem, MenuItem, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'ic-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    
  constructor(
    private primengConfig: PrimeNGConfig
) {}

items: MenuItem[]=[];
  
    ngOnInit() {
        this.items = [
            {
              label: "Home", 
              items: [
                {
                  label:"Home Page", icon: "pi pi-home" , routerLink: 'home'
                }
              ]
            },
            {
              
                label: "Manage Booking",
                items: [
                    {
                      label:"Booking", icon: "pi pi-home" , routerLink: 'booking'
                    },
                    { label: "create" },
                    { label: "edit" }
                ]
            },
            {
                label: "Manage Workspace",
                items: [
                    {  label:"Workspce", icon: "pi pi-home" , routerLink: 'workspace' }, 
                ]
            },
            {
              label: "Manage Profile",
              items: [
                  {  label:"Profile", icon: "pi pi-home" , routerLink: 'profile' }, 
                  
              ]
          }
        ];
    }

}
