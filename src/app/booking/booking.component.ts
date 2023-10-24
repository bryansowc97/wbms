import { Component,OnInit } from '@angular/core';
import { Booking, BookingDtlDTO } from './booking.model';
import { BookingStatusEnum } from '../constant.enum';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CognitoService, IUser } from '../cognito.service';
import { BookingService } from '../services/booking.service';
import { WorkspaceService } from '../services/workspace.service';
import { FacilitySeat, NFacilitySeat } from "../workspace/workspace.model";
import { formatDate } from '@angular/common';
import { Auth } from 'aws-amplify';
import * as FusionCharts from 'fusioncharts';

const data = {
  chart: {
    caption: "Workspace Availability",
    plottooltext: "<b>$percentValue</b> of web servers run on $label servers",
    showlegend: "1",
    showpercentvalues: "1",
    legendposition: "right",
    theme: "fusion"
  },
  data: [
    {
      label: "Available",
      value: "32647479"
    },
    {
      label: "Fully Booked",
      value: "22100932"
    },
    {
      label: "out of service",
      value: "18674221"
    }
  ]
};

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
    this.dataSource1 = {
      chart: {},
      caption: {
        text: "Daily Booking Analysis"
      },
      subcaption: {
        // text: "Grocery"
      },
      yaxis: [
        {
          plot: {
            value: "Booking Record by Time"
          },
          format: {
            // prefix: "$"
          },
          title: "Booking Count"
        }
      ]
    };
  
    this.fetchData();
  }

  
  type = "pie2d";
  dataFormat = "json";
  dataSource = data;

  dataSource1: any;

  user: IUser;
  userGroup: any[];
  isAdmin: boolean = false;
  bookingStatusEnum: { [key: string]: string } = BookingStatusEnum;
  stlBookingDTL: BookingDtlDTO;
  stlMode: string;
  displayView: boolean = false;

  search_key: any ;
  date: any;
  source: any;

  booking: Booking[];
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
  

  fetchData() {
    // this.bookingService.findAll().subscribe(res => {
    //   var jsonify = res => res.json();
      
    //   console.log('jsonify',dataFetch);
    // });

    
    // var dataFetch = fetch(
    //   "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/line-chart-with-time-axis-data.json"
    // ).then(jsonify);
    // var schemaFetch = fetch(
    //   "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/line-chart-with-time-axis-schema.json"
    // ).then(jsonify);
    var schemaFetch =  [
      {
        "name": "Time",
        "type": "date",
        "format": "%d-%b-%y"
      },
      {
        "name": "Grocery Sales Value",
        "type": "number"
      }
    ];

    var dataFetch = [
        [
          "01-Feb-11",
          8866
        ],
        [
          "02-Feb-11",
          2174
        ],
        [
          "03-Feb-11",
          2084
        ]
      ];
    // Promise.all([dataFetch, schemaFetch]).then(res => {
      const [data, schema] = [dataFetch, schemaFetch];
      // First we are creating a DataStore
      const fusionDataStore = new FusionCharts.DataStore();
      // After that we are creating a DataTable by passing our data and schema as arguments
      const fusionTable = fusionDataStore.createDataTable(data, schema);
      // Afet that we simply mutated our timeseries datasource by attaching the above
      // DataTable into its data property.
      this.dataSource1.data = fusionTable;
      console.log('data', this.dataSource1.data);
    // });
  }


  ngOnInit(): void {
    this.fetchData();
    this.cognitoService.getCurrentUser().then((user: any) => {
          this.user = user.attributes;

          this.cognitoService.getCurrentUserGroups().then((userGrp: any) => {
            this.userGroup = userGrp;
            this.messageService.add({
              severity: "warn",
              summary: "user info",
              detail: userGrp,
              sticky: false,
            });
            if(this.userGroup!== undefined && this.userGroup[0] === 'admin'){
              this.bookingService.findAll().subscribe(resv => {
                resv.forEach(res => {
                  this.workspaceService.getWorkspaceById(res.rescId).subscribe(r => {
                    this.cognitoService.findUserAndAttributesByUsername(res.employeeId).then(userData => {
                      this.bookingDtlDTO = res;
                      this.bookingDtlDTO.facilityDTO = r;
                      if(userData){
                        userData.UserAttributes.forEach(attribute => {
                          if(attribute.Name === 'name'){
                            this.bookingDtlDTO.employeeName = attribute.Value;
                          }
                        });
                      }else{
                        this.bookingDtlDTO.employeeName = 'UNKNOWN';
                      }
                      this.bookingDtlDTOList.push(this.bookingDtlDTO);
                      console.log(this.bookingDtlDTOList);
                    });
                  });
                });
              })
            }else{
              console.log('out',user.username); 
              this.bookingService.getBookingsByUser(user.username).subscribe(resv => {
                resv.forEach(res => {
                  this.workspaceService.getWorkspaceById(res.rescId).subscribe(r => {
                    this.bookingDtlDTO = res;
                    this.bookingDtlDTO.facilityDTO = r;
                    this.bookingDtlDTOList.push(this.bookingDtlDTO);
                    this.bookingDtlDTO.employeeName = this.user.name;
                  });
                });
              });
            }

          });
      });
  }

  onClickBooking(mode: string, id: any) {
    const queryParams = {
      mode: mode,
      id: id
    }
    this.router.navigate(['/booking'], { queryParams });

  }

  customSort(event:any):void{}
  
  clear(event:any):void{
    this.search_key = "";
    this.date = "";
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

}
