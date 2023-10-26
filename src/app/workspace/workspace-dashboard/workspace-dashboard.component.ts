import { Component } from '@angular/core';
import { NFacilityBooking, NFacilitySeat } from '../workspace.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RequestService } from 'src/app/services/request.service';
import { Router } from '@angular/router';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { CognitoService, IUser } from 'src/app/cognito.service';
import { Booking } from 'src/app/booking/booking.model';
import { BookingService } from 'src/app/services/booking.service';
import { DateTime } from 'aws-sdk/clients/devicefarm';
import { Auth } from 'aws-amplify';

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
    private cognitoService: CognitoService,
    private bookingService: BookingService,
    private workspaceService: WorkspaceService
  ){}

  // formGroup: any;
  showHover: boolean = false;
  bookingDate:any;
  currdate = new Date();
  timeSlot=[];

  user: IUser;
  userGroup: any[];
  isAdmin: boolean = false;
  curUser: string ;
  date: any;
  newSelectBookingDTL: Booking;
  showBook: boolean = false;
  selectedResourceDTL:NFacilityBooking = {} as NFacilityBooking;
  rows: number = 4;
  cols: number = 15;
  colsArr: any[] = [];

  bookingRecords : NFacilityBooking[]=[]

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
    this.bookingRecords = [];
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
    this.selectedResourceDTL.timeSlot = event.value;
    
    let startDte = this.date +"T"+ this.selectedResourceDTL.timeSlot.slice(0,5);
    let endDte = this.date +"T"+ this.selectedResourceDTL.timeSlot.slice(8,13);
    console.log('startdte', startDte);
    this.newSelectBookingDTL.dteStart = startDte;
    this.newSelectBookingDTL.dteEnd = endDte;
  }

  getSelectedResName(event:any) {
    this.colsArr = [];
    this.bookingRecords = [];
    for (let i=0;i<this.cols;i++) { 
      for (let i=0;i<this.rows;i++) {
        this.colsArr.push(0)
      }
    }
    this.clearForm();
    this.selectedResourceDTL!.subGp = event.value;
    this.workspaceService.getWorkspaceByGpAndSubGp(this.selectedResourceDTL!.gp, event.value).subscribe((res: any) => {
      this.selectedSeating = res.body;
      console.log('selectedSeating',this.selectedSeating);
      this.displaySltSeating(res.body);
      this.showHover = true;

      // get bookings
      let seatIds = this.selectedSeating.map((seat: NFacilitySeat) => seat.id)
      this.bookingService.getBookingsByIds(seatIds).subscribe((res:any) => {
        res.forEach((booking: any) => {
          let record: NFacilityBooking = {} as NFacilityBooking;
          let newDateStart = new Date(Date.parse(booking.dteStart));
          let newDateEnd = new Date(Date.parse(booking.dteEnd));
          
          record.date = this.getFormattedDate(newDateStart)
          record.timeSlot = `${newDateStart.getHours()}:00 - ${newDateEnd.getHours()}:00`
          record.emp_id = booking.employeeId

          let seatPointer = this.selectedSeating.filter((seat: NFacilitySeat) => seat.id === booking.rescId)
          record.name = seatPointer[0].name
          record.id = seatPointer[0].id
          record.gp = seatPointer[0].gp
          record.subGp = seatPointer[0].subGp
          record.status = seatPointer[0].status
          record.posGrid = seatPointer[0].posGrid
          record.posRotation = seatPointer[0].posRotation

          this.bookingRecords.push(record);
        })
      })
    })
    // this.clearForm();
  } 

  getFormattedDate(date: Date) {
    let newDate = date.toLocaleDateString('en-GB').replaceAll('/','-');
    return newDate.slice(0,6) + newDate.slice(8,10)
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
    this.selectedResourceDTL!.name = seatDTL[0].name;
    this.selectedResourceDTL!.id = seatDTL[0].id;
    this.selectedResourceDTL!.status = seatDTL[0].status;
    
    if(this.selectedResourceDTL.name !== undefined && this.selectedResourceDTL.status == 'A'){
      this.showBook=true;
    }else{
      this.showBook=false;
    }
    // console.log('selectDTL: ',this.selectedResourceDTL);
  }

  createBooking(){
    this.newSelectBookingDTL = {
      id: undefined,
      employeeId: this.curUser,
      rescId: this.selectedResourceDTL.id,
      dteStart: undefined,
      dteEnd:  undefined,
      status: "B"
    };
    
    
    this.confirmationService.confirm({
        accept: () => {
          this.submitBooking(this.newSelectBookingDTL);
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

  submitBooking(event: Booking){
    
    this.bookingService.updateBooking(this.newSelectBookingDTL).subscribe((res:any) => {
      let a = res;
      console.log(a);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Booking has been created.' }); 
        let subgpCopy = this.selectedResourceDTL.subGp;
        this.getSelectedResType({value: this.selectedResourceDTL.gp})
        this.getSelectedResName({value: subgpCopy}) 
        this.getTimeSlot();
      },
      (err: any) => {
        this.messageService.add({ severity: 'warn', summary: 'Unsuccessful', detail: err.title() });
      });
    
    
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

  getTimeSlot(){
    let temp = [
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

    let tzoffset = (new Date()).getTimezoneOffset() * 60000; 
    this.date = (new Date(this.selectedResourceDTL.date - tzoffset)).toISOString().slice(0,10);    
    console.log('date', this.date);
    this.bookingService.findByRescId(this.newSelectBookingDTL.rescId, this.date).subscribe( res => {
  
      let actBookedList = res.map(r => r.dteStart.slice(11,16).toString());

      console.log('timeslot check ',actBookedList);

      temp.forEach(t => {
        actBookedList.forEach(c => {
          if(t.slice(0,5).includes(c)){
            delete temp[temp.indexOf(t)];
          }
        })

        this.timeSlot = temp.filter(
          function (el) { 
            return el != null;
          }
        );
        
        
      });

      console.log('tempfil', this.timeSlot);
     
    });
  }

  async ngOnInit(): Promise<void> {
    //if admin / user access lvl view 
    await Auth.currentAuthenticatedUser()
      .then(user => {
        this.user = user;
        this.curUser = user.username;
        this.cognitoService.getCurrentUserGroups()
        .then((userGrp: any) => {
          this.userGroup = userGrp;
          if(this.userGroup && this.userGroup.find(o => o === 'admin')) {
            this.isAdmin = true;
          }
        });
      });
    
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
      bookDTL = this.bookingRecords.filter((book:NFacilityBooking) => book.posGrid===(index));
      
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
    if (this.bookingRecords.length>0) {
      this.messageService.add({ severity: 'warn', summary: 'Unsuccessful', detail: 'Workspace cannot be deleted because there are existing bookings.' });  
      return;
    }
    let idListToDelete = this.selectedSeating.map((seat:NFacilitySeat) => seat.id);
    this.workspaceService.delete(idListToDelete).subscribe((res:any) => {
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Workspace has been deleted.' });  
      this.getSelectedResType({value: this.selectedResourceDTL.gp})
    },
    (err: any) => {
      this.messageService.add({ severity: 'warn', summary: 'Unsuccessful', detail: 'Unexpected error occurred.' });
    
    });
  }

  editWorkspace() {
    this.router.navigateByUrl(`/createWorkspace?mode=edit`, {state: {bookingRecords: this.bookingRecords, seating: this.selectedSeating, gp:this.selectedResourceDTL.gp? this.selectedResourceDTL.gp : '', sub_gp:this.selectedResourceDTL.subGp? this.selectedResourceDTL.subGp: ''}});
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
