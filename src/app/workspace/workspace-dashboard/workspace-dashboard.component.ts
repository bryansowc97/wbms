import { Component } from '@angular/core';

@Component({
  selector: 'app-workspace-dashboard',
  templateUrl: './workspace-dashboard.component.html',
  styleUrls: ['./workspace-dashboard.component.scss']
})
export class WorkspaceDashboardComponent {

  // formGroup: any;
  showCreateBook: boolean = false;
  selectedResourceDTL:any;
  selectedResource:any;
  resource:any[] =[
    { 
      type:"Meeting Room",
      facility: [
        {
          name:"B4-MR01",
          map: "classroom-36510_960_720.png"
        },
        {
          name: "B4-MR02",
          map: "../../../assets/classroom-36510_960_720.png"
        }
      ]
    },
    {
      type:"Work Desk",
      facility: [
        {
          name:"B4-WS01",
          map: "../../../assets/classroom-36510_960_720.png"
        },
        {
          name: "B4-WS02"
        },
        {
          name: "B4-WS03"
        }
      ]
    }
  ];


  getSelectedResType(event:any) {
    this.selectedResource = event.value.facility;
    console.log(this.selectedResource);
    // this.clearForm();
  } 

  getSelectedResName(event:any) {
    this.selectedResourceDTL = event.value;
    console.log(this.selectedResourceDTL);
    // this.clearForm();
  } 

  showPopup(){
    this.showCreateBook = true
  }

}
