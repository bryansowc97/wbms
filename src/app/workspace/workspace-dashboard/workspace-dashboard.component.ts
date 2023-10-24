import { Component } from '@angular/core';
import { NFacilityBooking, NFacilitySeat } from '../workspace.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RequestService } from 'src/app/services/request.service';
import { Router } from '@angular/router';
import { WorkspaceService } from 'src/app/services/workspace.service';

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
    private router: Router,
    private workspaceService: WorkspaceService
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
  bookingDTL : NFacilityBooking = {} as NFacilityBooking;
  selectedResourceDTL:NFacilitySeat = {} as NFacilitySeat;
  rows: number = 4;
  cols: number = 15;
  colsArr: any[] = [];

  bookingRecord : NFacilityBooking[]=[
    {emp_id:'P123456', date: '10-10-23', timeSlot : '09:00 - 10:00', subGp:'Meeting Room', gp:'B4-MR01', posGrid:17, posRotation:'U', name: 'B4-MR01-17', status:'A'},
  ]

  openDeleteWorkspaceDialog: boolean = false;
  openCreateBookgDialog: boolean = false;

  selectedSeating: NFacilitySeat[] = []

  // seatingposGrid: number[] = [17, 18, 19, 32, 33, 34, 23, 24, 22, 38, 39, 37, 27, 42];
  // seatingposRotation: string[] = ['A','A','A','B','B','B','A','A','A','B','B','B', 'A', 'B'];

  resOptions: string[] = ['Meeting Room', 'Work Desk']
  subGpOptions: string[] = [];

  // resource:any[] =[
  //   { 
  //     type:"MR",
  //     label:"Meeting Room",
  //     facility: [
  //       {
  //         name:"B4-MR01",
  //         map: this.seating
  //       },
  //       {
  //         name: "B4-MR02",
  //         map: this.seating2
  //       }
  //     ]
  //   },
  //   {
  //     type:"WD",
  //     label:"Work Desk",
  //     facility: [
  //       {
  //         name:"B4-WD01",
  //         map: this.seating
  //       },
  //       {
  //         name: "B4-WD02",
  //         map: this.seating
  //       },
  //       {
  //         name: "B4-WD03",
  //         map: this.seating
  //       }
  //     ]
  //   }
  // ];


  getSelectedResType(event:any) {
    this.colsArr = [];
    for (let i=0;i<this.cols;i++) { 
      for (let i=0;i<this.rows;i++) {
        this.colsArr.push(0)
      }
    }
    this.clearForm();
    this.selectedResourceDTL!.subGp = undefined;
    this.selectedResourceDTL!.gp = event.value;
    this.workspaceService.findSubGpsByGp(event.value).subscribe((res: any) => {
      this.subGpOptions = res.body
    })
    // this.clearForm();
  } 

  getSelectedTimeSlot(event:any){
    this.bookingDTL.timeSlot = event.value;
  }

  getSelectedResName(event:any) {
    this.colsArr = [];
    for (let i=0;i<this.cols;i++) { 
      for (let i=0;i<this.rows;i++) {
        this.colsArr.push(0)
      }
    }
    this.clearForm();
    this.selectedResourceDTL!.subGp = event.value;
    this.workspaceService.getWorkspaceByGpAndSubGp(this.selectedResourceDTL!.gp, event.value).subscribe((res: any) => {
      this.selectedSeating = res.body;
      this.displaySltSeating(res.body);
      this.showHover = true;
    })
    // this.clearForm();
  } 

  displaySltSeating(seatMap:any){
    if(seatMap.length > 0){
      for (let temp = 0; temp < seatMap.length; temp++){
        let seatIndex = seatMap[temp].posGrid;
        if (seatIndex < (this.colsArr.length)) {
          if (seatMap[temp].posRotation == 'D') {
            this.colsArr[seatIndex] = 1;
          } else {
            this.colsArr[seatIndex] = 2;
          }
        } 
      }
    } else {
      this.colsArr = [];
      for (let i=0;i<this.cols;i++) { 
        for (let i=0;i<this.rows;i++) {
          this.colsArr.push(0)
        }
      }
    }
  }

  selectSeat(seatIndex: any){
    let seatDTL : NFacilitySeat[] ;
    seatDTL = this.selectedSeating.filter((seat:NFacilitySeat) => seat.posGrid===(seatIndex));
    this.selectedResourceDTL!.posGrid = seatIndex;
    this.selectedResourceDTL!.name = seatDTL[0].posRotation;
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
    this.selectedResourceDTL.posGrid = undefined;
    this.selectedResourceDTL.posRotation = undefined;
    this.selectedResourceDTL.status = undefined;
    this.showBook = false
  }

  submitBooking(){
    
    console.log('selectedResourceDTL',this.selectedResourceDTL);
    this.bookingDTL.gp = this.selectedResourceDTL.gp;
    this.bookingDTL.subGp = this.selectedResourceDTL.subGp;
    this.bookingDTL.name = this.selectedResourceDTL.name;
    
    
    this.bookingDTL.posGrid = this.selectedResourceDTL.posGrid;
    this.bookingDTL.posRotation = this.selectedResourceDTL.posRotation;
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

      let bookDTL : NFacilityBooking[] ;
      bookDTL = this.bookingRecord.filter((book:NFacilityBooking) => book.posGrid===(index));
      
      let seatDTL : NFacilitySeat[] ;
      seatDTL = this.selectedSeating.filter((seat:NFacilitySeat) => seat.posGrid===(index));
      
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
    this.router.navigateByUrl(`/createWorkspace?mode=edit`, {state: {seating: this.selectedSeating, gp:this.selectedResourceDTL.gp? this.selectedResourceDTL.gp : '', sub_gp:this.selectedResourceDTL.subGp? this.selectedResourceDTL.subGp: ''}});
  }

  checkOpacity(index: number): string {
    let seatIndex = this.selectedSeating.findIndex(s =>s.posGrid === (index));

    if (seatIndex != -1) {
      if (this.selectedSeating[seatIndex].status == 'A') {
        return '100%'
      } else {
        return '50%'
      }
    } else {
      return '100%'
    }
  }
}
