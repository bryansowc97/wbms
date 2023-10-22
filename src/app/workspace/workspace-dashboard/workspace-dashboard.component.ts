import { Component } from '@angular/core';
import { FacilityBooking, FacilitySeat } from '../workspace.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RequestService } from 'src/app/services/request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workspace-dashboard',
  templateUrl: './workspace-dashboard.component.html',
  styleUrls: ['./workspace-dashboard.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class WorkspaceDashboardComponent {
  constructor(
    private confirmationService: ConfirmationService,
    private requestService: RequestService,
    private messageService: MessageService,
    private router: Router
  ){}

  // formGroup: any;
  showHover: boolean = false;
  bookingDate:any;
  currdate = new Date();
  timeSlot:any[] = [
    '08:00 - 09:00',
    '09:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '12:00 - 13:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00',
    '17:00 - 18:00',
    '18:00 - 19:00'
  ];

  showBook: boolean = false;
  bookingDTL : FacilityBooking = {} as FacilityBooking;
  selectedResourceDTL:FacilitySeat = {} as FacilitySeat;
  selectedResource:any;
  rows: number = 4;
  cols: number = 15;
  colsArr: any[] = [];

  bookingRecord : FacilityBooking[]=[
    {emp_id:'P123456', date: '10-10-23', timeSlot : '09:00 - 10:00', sub_gp:'MR', gp:'B4-MR01', pos:17, rotation:'U', name: 'B4-MR01-17', status:'A'},
  ]

  openDeleteWorkspaceDialog: boolean = false;
  openCreateBookgDialog: boolean = false;

  seating: FacilitySeat[] = [
    {gp:'MR', sub_gp:'B4-MR01',pos:17, rotation:'D', name: 'B4-MR01-17', status:'A'},
    {gp:'MR', sub_gp:'B4-MR01',pos:32, rotation:'U', name: 'B4-MR01-32', status:'A'},
    {gp:'MR', sub_gp:'B4-MR01',pos:18, rotation:'D', name: 'B4-MR01-18', status:'U'},
    {gp:'MR', sub_gp:'B4-MR01',pos:33, rotation:'U', name: 'B4-MR01-33', status:'A'},
    {gp:'MR', sub_gp:'B4-MR01',pos:19, rotation:'D', name: 'B4-MR01-19', status:'A'},
    {gp:'MR', sub_gp:'B4-MR01',pos:34, rotation:'U', name: 'B4-MR01-34', status:'A'},
    {gp:'MR', sub_gp:'B4-MR01',pos:23, rotation:'D', name: 'B4-MR01-23', status:'A'},
    {gp:'MR', sub_gp:'B4-MR01',pos:38, rotation:'U', name: 'B4-MR01-38', status:'A'},
    {gp:'MR', sub_gp:'B4-MR01',pos:24, rotation:'D', name: 'B4-MR01-24', status:'A'},
    {gp:'MR', sub_gp:'B4-MR01',pos:39, rotation:'U', name: 'B4-MR01-39', status:'A'},
    {gp:'MR', sub_gp:'B4-MR01',pos:22, rotation:'D', name: 'B4-MR01-22', status:'A'},
    {gp:'MR', sub_gp:'B4-MR01',pos:37, rotation:'U', name: 'B4-MR01-37', status:'A'},
    {gp:'MR', sub_gp:'B4-MR01',pos:27, rotation:'D', name: 'B4-MR01-27', status:'A'},
    {gp:'MR', sub_gp:'B4-MR01',pos:42, rotation:'U', name: 'B4-MR01-42', status:'A'},
  ]

  seating2: any[] = [
    {pos:17, rotation:'D', status:'A'},
    {pos:32, rotation:'U', status:'A'},
    {pos:18, rotation:'D', status:'A'},
    {pos:33, rotation:'U', status:'A'},
    {pos:19, rotation:'D', status:'A'},
    {pos:34, rotation:'U', status:'A'},
    {pos:23, rotation:'D', status:'A'},
    {pos:38, rotation:'U', status:'A'},
    {pos:24, rotation:'D', status:'A'},
    {pos:39, rotation:'U', status:'A'},
    {pos:22, rotation:'D', status:'A'},
    {pos:37, rotation:'U', status:'A'},
    {pos:27, rotation:'D', status:'A'},
    {pos:3, rotation:'D', status:'A'},
    {pos:42, rotation:'U', status:'U'},
  ]

  // seatingPos: number[] = [17, 18, 19, 32, 33, 34, 23, 24, 22, 38, 39, 37, 27, 42];
  // seatingRotation: string[] = ['A','A','A','B','B','B','A','A','A','B','B','B', 'A', 'B'];

  resource:any[] =[
    { 
      type:"MR",
      label:"Meeting Room",
      facility: [
        {
          name:"B4-MR01",
          map: this.seating
        },
        {
          name: "B4-MR02",
          map: this.seating2
        }
      ]
    },
    {
      type:"WD",
      label:"Work Desk",
      facility: [
        {
          name:"B4-WD01",
          map: this.seating
        },
        {
          name: "B4-WD02",
          map: this.seating
        },
        {
          name: "B4-WD03",
          map: this.seating
        }
      ]
    }
  ];


  getSelectedResType(event:any) {
    this.selectedResource = event.value.facility;
    this.selectedResourceDTL!.gp = event.value.type;
    // this.clearForm();
  } 

  getSelectedTimeSlot(event:any){
    this.bookingDTL.timeSlot = event.value;
  }

  getSelectedResName(event:any) {
    this.selectedResourceDTL!.sub_gp = event.value.name;
    this.displaySltSeating(event.value.map);
    this.showHover = true;
    // this.clearForm();
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

  selectSeat(seatIndex: any){
    let seatDTL : FacilitySeat[] ;
    seatDTL = this.seating.filter((seat:FacilitySeat) => seat.pos===(seatIndex));
    this.selectedResourceDTL!.pos = seatIndex;
    this.selectedResourceDTL!.name = seatDTL[0].rotation;
    this.selectedResourceDTL!.name = seatDTL[0].name;
    if(this.selectedResourceDTL.name !== undefined){
      this.showBook=true;
    }else{
      this.showBook=false;
    }
    // console.log('selectDTL: ',this.selectedResourceDTL);
  }

  createBooking(){
    this.openCreateBookgDialog = true;
    this.openDeleteWorkspaceDialog = false;
    this.confirmationService.confirm({
        accept: () => {
          this.submitBooking();
        },
        reject: () =>{
          this.clearForm();
        }
    });
  }

  clearForm(){
    // this.selectedResourceDTL.fName = undefined;
    // this.selectedResourceDTL.fType = undefined;
    this.selectedResourceDTL.name = undefined;
    this.selectedResourceDTL.pos = undefined;
    this.selectedResourceDTL.rotation = undefined;
    this.selectedResourceDTL.status = undefined;
    this.showBook = false
  }

  submitBooking(){
    
    console.log('selectedResourceDTL',this.selectedResourceDTL);
    this.bookingDTL.gp = this.selectedResourceDTL.gp;
    this.bookingDTL.sub_gp = this.selectedResourceDTL.sub_gp;
    this.bookingDTL.name = this.selectedResourceDTL.name;
    
    
    this.bookingDTL.pos = this.selectedResourceDTL.pos;
    this.bookingDTL.rotation = this.selectedResourceDTL.rotation;
    this.bookingDTL.status = this.selectedResourceDTL.status;

    console.log('bookingDTL',this.bookingDTL);
    this.requestService.createBooking(this.bookingDTL);
    this.clearForm();
    // .then((res: any)=>{
    //   this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Booking has been created.' });
    // })
    // .catch((error)=>{
    //   this.messageService.add({
    //     key:"error",
    //     severity: "error",
    //     summary: "Unsuccessful!",
    //     detail: error,
    //     sticky: true,
    //   });
    // });
  }

  ngOnInit(): void {
    console.log('currdate', this.currdate)
    for (let i=0;i<this.cols;i++) { 
      for (let i=0;i<this.rows;i++) {
        this.colsArr.push(0)
        // if (this.seatingPos.includes(this.colsArr.length)) {
        //   let posIndex = this.seatingPos.findIndex(x=>x==this.colsArr.length);
        //   if (this.seatingRotation[posIndex] == 'A') {
        //     this.colsArr.push(1)
        //   } else {
        //     this.colsArr.push(2)
        //   }
        // } else { 
        //   this.colsArr.push(0)
        // }
      }
    }
  }

  getHover(index: any){

    if(this.showHover){
      // console.log('index',index);

      let bookDTL : FacilityBooking[] ;
      bookDTL = this.bookingRecord.filter((book:FacilityBooking) => book.pos===(index));
      
      let seatDTL : FacilitySeat[] ;
      seatDTL = this.seating.filter((seat:FacilitySeat) => seat.pos===(index));
      
      if(bookDTL.length > 0 && seatDTL.length>0){
        let result = 'name: ' + seatDTL[0].name + 
                      '\nstatus: ' + seatDTL[0].status+
                      '\ndate: ' + bookDTL[0].date + 
                      '\ntime: ' + bookDTL[0].timeSlot;
        return result;
      }else if(seatDTL.length>0){
        let result = 'name: ' + seatDTL[0].name + 
                      '\nstatus: ' + seatDTL[0].status;
        return result;
      }else{
        return '';
      }
    }
    else{
      // console.log('index',index);
      return '';
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

  deleteWorkspace() {
    this.openCreateBookgDialog = false;
    this.openDeleteWorkspaceDialog = true;
    this.confirmationService.confirm({
      accept: () => {
        this.openDeleteWorkspaceDialog = false;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Workspace has been deleted.' });
      }
    });
  }

  editWorkspace() {
    this.router.navigateByUrl(`/createWorkspace?mode=edit`, {state: {seating: this.seating2, gp:this.selectedResourceDTL.gp? this.selectedResourceDTL.gp : '', sub_gp:this.selectedResourceDTL.sub_gp? this.selectedResourceDTL.sub_gp: ''}});
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
