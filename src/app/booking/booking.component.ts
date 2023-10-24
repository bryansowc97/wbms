import { Component,OnInit } from '@angular/core';
import { Booking, BookingDtlDTO } from './booking.model';
import { BookingStatusEnum } from '../constant.enum';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CognitoService, IUser } from '../cognito.service';
import { BookingService } from '../services/booking.service';
import { WorkspaceService } from '../services/workspace.service';
import { FacilitySeat, NFacilitySeat } from "../workspace/workspace.model";
import { Auth } from 'aws-amplify';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingDashboardComponent implements OnInit {
  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
    private cognitoService: CognitoService,
    private bookingService: BookingService,
    private workspaceService: WorkspaceService,
    private messageService: MessageService
  ){
  }

  user: IUser;
  userGroup: any[];
  isAdmin: boolean = false;
  bookingStatusEnum: { [key: string]: string } = BookingStatusEnum;
  isLoading: boolean = true;

  search_key: any ;
  date: any;
  source: any;
  booking: Booking[];
  workspaceList: any[];
  bookingDtlDTOList: BookingDtlDTO[] = [];
  bookingDtlDTO: BookingDtlDTO;
  // =[
  //   { emp_id: 'P123456', employee_name: 'Alvin Tan', date : '10/06/2023', timeSlot : '10:00am - 12:00pm', bookedStatus: 'B', sub_gp: 'B6-A1', gp: 'Meeting Room', name : 'B6-A1-09', pos: '23', rotation:'D', status:'A'},
  //   { emp_id: 'P123456', employee_name: 'Alvin Tan', date : '10/06/2023', timeSlot : '10:00am - 12:00pm', bookedStatus: 'D', sub_gp: 'B6-A1', gp: 'Meeting Room', name : 'B6-A1-09', pos: '23', rotation:'D', status:'D'},
  //   { emp_id: 'P123456', employee_name: 'Alvin Tan', date : '10/06/2023', timeSlot : '10:00am - 12:00pm', bookedStatus: 'D', sub_gp: 'B6-A1', gp: 'Meeting Room', name : 'B6-A1-09', pos: '23', rotation:'D', status:'M'},
  //   { emp_id: 'P123456', employee_name: 'Alvin Tan', date : '10/06/2023', timeSlot : '10:00am - 12:00pm', bookedStatus: 'B', sub_gp: 'B6-A1', gp: 'Meeting Room', name : 'B6-A1-09', pos: '23', rotation:'D', status:'A'},
  //   { emp_id: 'P123456', employee_name: 'Alvin Tan', date : '10/06/2023', timeSlot : '10:00am - 12:00pm', bookedStatus: 'B', sub_gp: 'B6-A1', gp: 'Meeting Room', name : 'B6-A1-09', pos: '23', rotation:'D', status:'A'},
  //   { emp_id: 'P123456', employee_name: 'Alvin Tan', date : '10/06/2023', timeSlot : '10:00am - 12:00pm', bookedStatus: 'B', sub_gp: 'B6-A1', gp: 'Meeting Room', name : 'B6-A1-09', pos: '23', rotation:'D', status:'A'},
  //   { emp_id: 'P123456', employee_name: 'Alvin Tan', date : '10/06/2023', timeSlot : '10:00am - 12:00pm', bookedStatus: 'B', sub_gp: 'B6-A1', gp: 'Meeting Room', name : 'B6-A1-09', pos: '23', rotation:'D', status:'A'},

  // ];

  async ngOnInit(): Promise<void> {
    //if admin / user access lvl view 
    await Auth.currentAuthenticatedUser()
      .then(user => {
        this.user = user;
        this.cognitoService.getCurrentUserGroups()
        .then((userGrp: any) => {
          this.userGroup = userGrp;
          if(this.userGroup && this.userGroup.find(o => o === 'admin')) {
            this.isAdmin = true;
          }
          this.workspaceService.findAll().subscribe(workspaceList => {
            this.workspaceList = workspaceList;
            if (this.isAdmin) {
              this.bookingService.findAll().subscribe(resv => {
                this.bookingDtlDTOList = resv;
                this.setupBookingDtlDtoList();                
                this.isLoading = false;
              });
            }
            else {
              this.bookingService.getBookingsByUser(this.user.username).subscribe(resv => {
                this.bookingDtlDTOList = resv;
                this.setupBookingDtlDtoList();                
                this.isLoading = false;
              });
            }
          })
        });
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
        this.isLoading = false;    
      });
  }

  public setupBookingDtlDtoList(): void {
    this.bookingDtlDTOList.forEach(res => {
      let workspace = this.workspaceList.find(wkspace => wkspace.id = res.rescId);
      if (workspace) {
        res.facilityDTO = workspace;
      }
    });
  }

  customSort(event:any):void{}
  
  clear(table: Table):void{
    this.search_key = "";
    this.date = "";
    table.clear();
  }

  applyFilterGlobal(table: Table, $event: Event, stringVal: string) {
    table.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  onSelectCalendarDate(event: any, table: Table) {
    const eventDate = new Date(event);
    let year = eventDate.getFullYear();
    let month = eventDate.getMonth() + 1;
    let day = eventDate.getDate();
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    table.filter(formattedDate, 'dteStart', 'contains');
  }

  getSeverity(event:string):string{
    return event === this.bookingStatusEnum['B'] ? 'success':'danger';
  }

  deleteBooking(event: any) {
    this.confirmationService.confirm({
        accept: () => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Booking has been deleted.' });
        }
    });
  }

  updateBooking(): void{
    let booking: Booking = {
      id: 10,
      employeeId: 'P1111111',
      rescId: 1,
      dteStart: Date,
      dteEnd : Date,
      status: 'B',
    }
    this.bookingService.updateBooking(booking).subscribe((res:any) => {
      let a = res;
      console.log(a);
    })

  }

}
