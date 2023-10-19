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
  
  constructor(
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ){
    this.createWorkspace = this.formBuilder.group({
      gp : ['', Validators.required],
      sub_gp : ['', [Validators.required]],
      status: ['', [Validators.required]],
      pos: ['', [Validators.required]],
      rotation: ['', [Validators.required]],
      name : ['', [Validators.required]],
    });
  }

  createWorkspace: FormGroup;
  facilityList?: FacilitySeat[];
  newFacility: FacilitySeat = {} as FacilitySeat;
  
  inProgress: boolean = false;
  isComplete: boolean = false;
  isRotate: boolean = false;
  currIndex?: number;
  rows: number = 4;
  cols: number = 15;
  colsArr: any[] = [];
  items: MenuItem[] | undefined;

  
  seating: 
  // Seating[] = [
  //   {pos:17, rotation:'A', name: 'B4-MR01-17'},
  //   {pos:32, rotation:'B', name: 'B4-MR01-32'},
  //   {pos:18, rotation:'A', name: 'B4-MR01-18'},
  //   {pos:33, rotation:'B', name: 'B4-MR01-33'},
  //   {pos:19, rotation:'A', name: 'B4-MR01-19'},
  //   {pos:34, rotation:'B', name: 'B4-MR01-34'},
  //   {pos:23, rotation:'A', name: 'B4-MR01-23'},
  //   {pos:38, rotation:'B', name: 'B4-MR01-38'},
  //   {pos:24, rotation:'A', name: 'B4-MR01-24'},
  //   {pos:39, rotation:'B', name: 'B4-MR01-39'},
  //   {pos:22, rotation:'A', name: 'B4-MR01-22'},
  //   {pos:37, rotation:'B', name: 'B4-MR01-37'},
  //   {pos:27, rotation:'A', name: 'B4-MR01-27'},
  //   {pos:42, rotation:'B', name: 'B4-MR01-42'},
  // ]

  // resource:
  FacilitySeat[] =[
    {gp : 'Meeting Room', sub_gp : 'B4-MR01', status: 'A', pos:17, rotation:'A', name: 'B4-MR01-17'},
    {gp : 'Meeting Room', sub_gp : 'B4-MR01', status: 'A', pos:32, rotation:'B', name: 'B4-MR01-32'},
    {gp : 'Meeting Room', sub_gp : 'B4-MR01', status: 'A', pos:18, rotation:'A', name: 'B4-MR01-18'},
    {gp : 'Meeting Room', sub_gp : 'B4-MR01', status: 'A', pos:33, rotation:'B', name: 'B4-MR01-33'},
    {gp : 'Meeting Room', sub_gp : 'B4-MR01', status: 'A', pos:19, rotation:'A', name: 'B4-MR01-19'},
    {gp : 'Meeting Room', sub_gp : 'B4-MR01', status: 'A', pos:34, rotation:'B', name: 'B4-MR01-34'}
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
          if (seatMap[temp].rotation == 'A') {
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
      this.seating.push(this.newFacility);
      this.clear();
    }
  }

  clear(){
    this.createWorkspace.reset();
    this.inProgress = false;
    this.isRotate = false;
    this.currIndex = undefined;
  }

  cancel(){
    this.seating.pop();
    this.colsArr[this.newFacility.pos] = 0;
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
            console.log(this.seating[seatIndex].rotation);
            this.isRotate = true;
            this.seating[seatIndex].rotation = 'U';
            this.colsArr[index] = 2;
            console.log(this.seating[seatIndex].rotation);
            
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
            this.isRotate = true;
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
        { label: 'Add', icon: 'pi pi-plus', 
          command: (e) => {
            this.inProgress = true;
            
            this.newFacility.pos = index;
            this.newFacility.rotation = 'D';
            this.seating.push(this.newFacility);
            this.colsArr[index] = 1
          } 
        }
      ];
    }

    if(this.inProgress || this.isRotate){
      if(this.currIndex == index){
        contextMenu.show(event);
      }
    }else{
      this.currIndex = index;
      contextMenu.show(event);
    }
    
  }
}



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