import { Component } from '@angular/core';
import { MegaMenuItem, MenuItem, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

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

  // items: MenuItem[];
  //   ngOnInit() {
  //       this.items = [
  //           { label: "Home", icon: "pi pi-home" , routerLink: 'home'},
  //           {label: "Data Structures",
  //           items: [
  //               {
  //                   label: "Linked List",
  //                   items: [
  //                       { label: "Singly Linked List" },
  //                       { label: "Doubly Linked List" }
  //                   ]
  //               },
  //               { label: "Array" },
  //               { label: "Stack" }
  //           ]},
  //           { label: "Booking", icon: "pi pi-fw pi-globe" , routerLink: 'booking'},
  //           { label: "Workspace", icon: "pi pi-fw pi-file" , routerLink: 'workspace'},
  //           { label: "Profile", icon: "pi pi-fw pi-file" , routerLink: 'profile',}
  //       ];
  //   }
}
