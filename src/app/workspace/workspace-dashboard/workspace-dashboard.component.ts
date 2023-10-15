import { Component } from '@angular/core';
import { FacilitySeat, Seating } from '../workspace.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RequestService } from 'src/app/services/request.service';

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
    private messageService: MessageService
  ){}

  // formGroup: any;
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
  selectedResourceDTL:FacilitySeat = {} as FacilitySeat;
  selectedResource:any;
  rows: number = 4;
  cols: number = 15;
  colsArr: any[] = [];

  seating: Seating[] = [
    {pos:17, rotation:'A', name: 'B4-MR01-17'},
    {pos:32, rotation:'B', name: 'B4-MR01-32'},
    {pos:18, rotation:'A', name: 'B4-MR01-18'},
    {pos:33, rotation:'B', name: 'B4-MR01-33'},
    {pos:19, rotation:'A', name: 'B4-MR01-19'},
    {pos:34, rotation:'B', name: 'B4-MR01-34'},
    {pos:23, rotation:'A', name: 'B4-MR01-23'},
    {pos:38, rotation:'B', name: 'B4-MR01-38'},
    {pos:24, rotation:'A', name: 'B4-MR01-24'},
    {pos:39, rotation:'B', name: 'B4-MR01-39'},
    {pos:22, rotation:'A', name: 'B4-MR01-22'},
    {pos:37, rotation:'B', name: 'B4-MR01-37'},
    {pos:27, rotation:'A', name: 'B4-MR01-27'},
    {pos:42, rotation:'B', name: 'B4-MR01-42'},
  ]

  seating2: any[] = [
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
    {pos:3, rotation:'A'},
    {pos:42, rotation:'B'},
  ]

  // seatingPos: number[] = [17, 18, 19, 32, 33, 34, 23, 24, 22, 38, 39, 37, 27, 42];
  // seatingRotation: string[] = ['A','A','A','B','B','B','A','A','A','B','B','B', 'A', 'B'];

  resource:any[] =[
    { 
      type:"Meeting Room",
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
      type:"Work Desk",
      facility: [
        {
          name:"B4-WS01",
          map: this.seating
        },
        {
          name: "B4-WS02",
          map: this.seating
        },
        {
          name: "B4-WS03",
          map: this.seating
        }
      ]
    }
  ];


  getSelectedResType(event:any) {
    this.selectedResource = event.value.facility;
    this.selectedResourceDTL!.fType = event.value.type;
    // this.clearForm();
  } 

  getSelectedResName(event:any) {
    this.selectedResourceDTL!.fName = event.value.name;
    this.displaySltSeating(event.value.map);
    // this.clearForm();
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

  selectSeat(seatIndex: any){
    let seatDTL : Seating[] ;
    seatDTL = this.seating.filter((seat:Seating) => seat.pos===(seatIndex));
    this.selectedResourceDTL!.seatPos = seatIndex;
    this.selectedResourceDTL!.seatName = seatDTL[0].rotation;
    this.selectedResourceDTL!.seatName = seatDTL[0].name;
    if(this.selectedResourceDTL.seatName !== undefined){
      this.showBook=true;
    }else{
      this.showBook=false;
    }
    // console.log('selectDTL: ',this.selectedResourceDTL);
  }

  createBooking(){
      this.confirmationService.confirm({
          accept: () => {
            this.submitBooking();
          }
      });
    
  }

  submitBooking(){
    console.log('selectedResourceDTL',this.selectedResourceDTL);
    this.requestService.createBooking(this.selectedResourceDTL);
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
