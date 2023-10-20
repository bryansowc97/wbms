import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';
import { FacilitySeat } from '../workspace.model';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { catchError, throwError } from 'rxjs';


@Component({
  selector: 'app-workspace',
  templateUrl: './create_workspace.component.html',
  styleUrls: ['./create_workspace.component.scss']
})

export class CreateWorkspaceComponent implements OnInit {
  
  createWorkspace: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ){
    this.createWorkspace = this.formBuilder.group({
      gp : ['', Validators.required], // workspace or meeting room
      sub_gp : ['', [Validators.required]], //eg B4-WS01
    });
  }

  gpOptions:any[] =[
    { value:'WD', label: 'Work Desk'},
    { value:'MR', label: 'Meeting Room'}
  ];
  statusOptions:any[] =[
    { value:'A', label: 'Available'},
    { value:'U', label: 'Unavailable (Maintenance)'}
  ];

  // newFacility: FacilitySeat = {} as FacilitySeat;
  
  rows: number = 4;
  cols: number = 15;
  colsArr: any[] = [];
  items: MenuItem[] | undefined;
  
  seating: FacilitySeat[] =[
    {gp : undefined, sub_gp : undefined, status: 'A', pos:17, rotation:'D', name: undefined},
    {gp : undefined, sub_gp : undefined, status: 'A', pos:32, rotation:'U', name: undefined},
    {gp : undefined, sub_gp : undefined, status: 'A', pos:18, rotation:'D', name: undefined},
    {gp : undefined, sub_gp : undefined, status: 'A', pos:33, rotation:'U', name: undefined},
    {gp : undefined, sub_gp : undefined, status: 'A', pos:19, rotation:'D', name: undefined},
    {gp : undefined, sub_gp : undefined, status: 'A', pos:34, rotation:'U', name: undefined}
  ];

  // seatingPos: number[] = [17, 18, 19, 32, 33, 34, 23, 24, 22, 38, 39, 37, 27, 42];
  // seatingRotation: string[] = ['D','D','D','U','U','U','D','D','D','U','U','U', 'D', 'U'];

  ngOnInit(): void {
    for (let i=0;i<this.cols;i++) { 
      for (let i=0;i<this.rows;i++) {
        this.colsArr.push(0)
      }
    }

    this.displaySltSeating(this.seating);
    // for (let i=0;i<this.cols;i++) { 
    //   for (let i=0;i<this.rows;i++) {
    //     if (this.seatingPos.includes(this.colsArr.length)) {
    //       let posIndex = this.seatingPos.findIndex(x=>x==this.colsArr.length);
    //       if (this.seatingRotation[posIndex] == 'D') {
    //         this.colsArr.push(1)
    //       } else {
    //         this.colsArr.push(2)
    //       }
    //     } else { 
    //       this.colsArr.push(0)
    //     }
    //   }
    // }
  }

  displaySltSeating(seatMap:any){
    if(seatMap.length > 0){
      for (let temp = 0; temp < seatMap.length; temp++){
        let seatIndex = seatMap[temp].pos;
        if (seatIndex < (this.colsArr.length)) {
          if (seatMap[temp].rotation == 'D') {
            this.colsArr[seatIndex] = 1;
          } else {
            this.colsArr[seatIndex] = 2;
          }
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

  createFacility(){
    //save to db
    console.log('valid: ', this.createWorkspace.valid);
    if(this.createWorkspace.valid){
      this.seating.forEach((seating: FacilitySeat) => {
        seating.gp = this.createWorkspace.get('gp')?.value
        seating.sub_gp = this.createWorkspace.get('sub_gp')?.value
        seating.name = this.createWorkspace.get('sub_gp')?.value + '-' + seating.pos
      })

      console.log(this.seating)
    } else {
      this.createWorkspace.markAllAsTouched();
    }
  }

  clear(){
    this.createWorkspace.reset();
  }

  cancel(){
    this.seating = [];
    this.colsArr = [];
    for (let i=0;i<this.cols;i++) { 
      for (let i=0;i<this.rows;i++) {
        this.colsArr.push(0)
      }
    }
    this.clear(); 
  }

  openContextMenu(event:MouseEvent ,contextMenu: ContextMenu, index: number): void {
    
    event.stopPropagation();
    event.preventDefault();
    event.stopImmediatePropagation();

    let seatDTL = this.seating.filter((seat:FacilitySeat) => seat.pos===(index));
    let seatIndex = this.seating.findIndex(s =>s.pos === (index));

    if (seatDTL.length > 0) {
      if (seatDTL[0].rotation == 'D') {
        this.items = [
          { label: 'Rotate', icon: 'pi pi-replay', command: (e) => {
            // seatDTL[0].rotation = 'U';
            // console.log(this.seating[seatIndex].rotation);
            this.seating[seatIndex].rotation = 'U';
            this.colsArr[index] = 2;
            // console.log(this.seating[seatIndex].rotation);
          } },
          { label: 'Mark Available/ Unavailable', icon: 'pi pi-pencil', command: (e) => {
            this.seating[seatIndex].status = this.seating[seatIndex].status == 'A' ? 'U' : 'A'
          } },
          { label: 'Delete', icon: 'pi pi-minus', command: (e) => {
            this.seating.splice(seatIndex);
            this.colsArr[index] = 0;
          } },
          { label: 'Cancel', command: (e) => {
          } }
        ];
      } else {
        this.items = [
          { label: 'Rotate', icon: 'pi pi-replay', command: (e) => {
            // seatDTL[0].rotation = 'D'
            this.seating[seatIndex].rotation = 'D';
            this.colsArr[index] = 1;
          } },
          { label: 'Mark Available/ Unavailable', icon: 'pi pi-pencil', command: (e) => {
            this.seating[seatIndex].status = this.seating[seatIndex].status == 'A' ? 'U' : 'A'
          } },
          { label: 'Delete', icon: 'pi pi-minus', command: (e) => {
            this.seating.splice(seatIndex);
            this.colsArr[index] = 0;
          } },
          { label: 'Cancel', command: (e) => {
          } }
        ];
      }
    } else {   
      this.items = [
        { label: 'Add', icon: 'pi pi-plus', 
          command: (e) => {
            
            let newFacility: FacilitySeat = {
              gp: undefined, // will only set when saving
              sub_gp: undefined,
              pos: index,
              rotation:'D',
              name: undefined,
              status: 'A'
            };

            this.seating.push(newFacility);
            this.colsArr[index] = 1;
          } 
        },
        { label: 'Cancel', command: (e) => {
        } }
      ];
    }

    contextMenu.show(event);
    
  }

  checkOpacity(index: number): string {
    let seatIndex = this.seating.findIndex(s =>s.pos === (index));

    if (seatIndex != -1) {
      if (this.seating[seatIndex].status == 'A') {
        return '100%'
      } else {
        return '50%'
      }
    } else {
      return '100%'
    }
  }
}


// if(this.inProgress || this.isRotate){
//   if(this.currIndex == index){
//     contextMenu.show(event);
//   }
// }else{
//   this.currIndex = index;
//   contextMenu.show(event);
// }

/*
openContextMenu(event: MouseEvent, contextMenu: ContextMenu, index: number): void {
    event.stopPropagation();
    event.preventDefault();

    let seatDTL = this.seating.filter((seat:FacilitySeat) => seat.pos===(index));
    let seatIndex = this.seating.findIndex(s =>s.pos === (index));

    if (seatDTL.length > 0) {
      
      if (seatDTL[0].rotation == 'D') {
        this.items = [
          { label: 'Rotate', icon: 'pi pi-replay', command: (e) => {
            // seatDTL[0].rotation = 'U';
            this.seating[seatIndex].rotation = 'U';
            this.colsArr[index] = 2;
          } },
          { label: 'Delete', icon: 'pi pi-minus', command: (e) => {
            this.seating.splice(seatIndex);
            this.colsArr[index] = 0
          } }
        ];
      } else {
        this.items = [
          { label: 'Rotate', icon: 'pi pi-replay', command: (e) => {
            // seatDTL[0].rotation = 'D'
            this.seating[seatIndex].rotation = 'D';
            this.colsArr[index] = 1;
          } },
          { label: 'Delete', icon: 'pi pi-minus', command: (e) => {
            this.seating.splice(seatIndex);
            this.colsArr[index] = 0
          } }
        ];
      }
    } else {   
      this.items = [
        { label: 'Add', icon: 'pi pi-plus', command: (e) => {
          this.inProgress = true;
          this.newFacility.pos = index;
          this.newFacility.rotation = 'D';
          console.log('newResc', this.newFacility)
          this.seating.push(this.newFacility);
          this.colsArr[index] = 1
        } }
      ];
    }

    if(this.inProgress && this.currIndex == index){
      contextMenu.show(event);
    }else if(!this.inProgress){
      contextMenu.show(event);
    }
    
    


    // else{
    //   this.messageService.add({
    //     key:"error",
    //     severity: "error",
    //     summary: "Unsuccessful!",
    //     detail: "Please complete current facility creation before add another new facility. To discard current creation action please click 'CANCEL'",
    //     sticky: true,
    //   });
    // }
      
   
  }*/