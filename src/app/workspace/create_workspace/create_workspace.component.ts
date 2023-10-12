import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workspace',
  templateUrl: './create_workspace.component.html',
  styleUrls: ['./create_workspace.component.scss']
})

export class CreateWorkspaceComponent implements OnInit {
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
