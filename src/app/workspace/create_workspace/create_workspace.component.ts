import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';

@Component({
  selector: 'app-workspace',
  templateUrl: './create_workspace.component.html',
  styleUrls: ['./create_workspace.component.scss']
})

export class CreateWorkspaceComponent implements OnInit {
  rows: number = 4;
  cols: number = 15;
  colsArr: any[] = [];
  items: MenuItem[] | undefined;

  seating: any[] = [
    {pos:17, rotation:'D'},
    {pos:32, rotation:'U'},
    {pos:18, rotation:'D'},
    {pos:33, rotation:'U'},
    {pos:19, rotation:'D'},
    {pos:34, rotation:'U'},
    {pos:23, rotation:'D'},
    {pos:38, rotation:'U'},
    {pos:24, rotation:'D'},
    {pos:39, rotation:'U'},
    {pos:22, rotation:'D'},
    {pos:37, rotation:'U'},
    {pos:27, rotation:'D'},
    {pos:42, rotation:'U'},
  ]

  seatingPos: number[] = [17, 18, 19, 32, 33, 34, 23, 24, 22, 38, 39, 37, 27, 42];
  seatingRotation: string[] = ['D','D','D','U','U','U','D','D','D','U','U','U', 'D', 'U'];

  ngOnInit(): void {
    for (let i=0;i<this.cols;i++) { 
      for (let i=0;i<this.rows;i++) {
        if (this.seatingPos.includes(this.colsArr.length)) {
          let posIndex = this.seatingPos.findIndex(x=>x==this.colsArr.length);
          if (this.seatingRotation[posIndex] == 'D') {
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

  openContextMenu(event: MouseEvent, contextMenu: ContextMenu, index: number): void {
    event.stopPropagation();
    event.preventDefault();

    if (this.seatingPos.includes(index)) {
      let posIndex = this.seatingPos.findIndex(x=>x==index);
      if (this.seatingRotation[posIndex] == 'D') {
        this.items = [
          { label: 'Rotate', icon: 'pi pi-replay', command: (e) => {
            this.seatingRotation[posIndex] = 'U'
            this.colsArr[index] = 2
          } },
          { label: 'Delete', icon: 'pi pi-minus', command: (e) => {
            this.seatingRotation.splice(posIndex, 1)
            this.seatingPos.splice(posIndex, 1)
            this.colsArr[index] = 0
          } }
        ];
      } else {
        this.items = [
          { label: 'Rotate', icon: 'pi pi-replay', command: (e) => {
            this.seatingRotation[posIndex] = 'D'
            this.colsArr[index] = 1
          } },
          { label: 'Delete', icon: 'pi pi-minus', command: (e) => {
            this.seatingRotation.splice(posIndex, 1)
            this.seatingPos.splice(posIndex, 1)
            this.colsArr[index] = 0
          } }
        ];
      }
    } else {   
      this.items = [
        { label: 'Add', icon: 'pi pi-plus', command: (e) => {
          this.seatingPos.push(index);
          this.seatingRotation.push('D');
          this.colsArr[index] = 1
        } }
      ];
    }

    contextMenu.show(event);
  }
}
