import { Component } from '@angular/core';

@Component({
  selector: 'app-workspace-dashboard',
  templateUrl: './workspace-dashboard.component.html',
  styleUrls: ['./workspace-dashboard.component.scss']
})
export class WorkspaceDashboardComponent {

  // formGroup: any;
  selectedResourceDTL:any;
  selectedResource:any;
  rows: number = 4;
  cols: number = 15;
  colsArr: any[] = [];

  seating: any[] = [
    {pos:17, rotation:'A'},
    {pos:32, rotation:'B'},
    {pos:18, rotation:'A'},
    {pos:33, rotation:'B'},
    {pos:19, rotation:'A'},
    {pos:34, rotation:'B'},
    {pos:23, rotation:'A'},
    {pos:38, rotation:'B'},
    {pos:24, rotation:'A'},
    {pos:39, rotation:'B'},
    {pos:22, rotation:'A'},
    {pos:37, rotation:'B'},
    {pos:27, rotation:'A'},
    {pos:42, rotation:'B'},
  ]

  seatingPos: number[] = [17, 18, 19, 32, 33, 34, 23, 24, 22, 38, 39, 37, 27, 42];
  seatingRotation: string[] = ['A','A','A','B','B','B','A','A','A','B','B','B', 'A', 'B'];

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

  ngOnInit(): void {
    for (let i=0;i<this.cols;i++) { 
      for (let i=0;i<this.rows;i++) {
        if (this.seatingPos.includes(this.colsArr.length)) {
          let posIndex = this.seatingPos.findIndex(x=>x==this.colsArr.length);
          if (this.seatingRotation[posIndex] == 'A') {
            this.colsArr.push(1)
          } else {
            this.colsArr.push(2)
          }
        } else { 
          this.colsArr.push(0)
        }
      }
    }
  }

  getGridImg(indicator: number) {
    if (indicator == 1) {
      return ('../../../assets/workdesk.png')
    } else if (indicator == 2) {
      return ('../../../assets/workdesk2.png')
    } else {
      return ('../../../assets/workdesk3.png')
    }
  }
}
