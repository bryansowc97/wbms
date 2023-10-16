import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfile } from 'src/app/models/profile.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CognitoService, IUser } from 'src/app/cognito.service';
   
@Component({
  selector: 'app-profile',
  templateUrl: 'create-edit-profile.component.html',
  styleUrls: ['create-edit-profile.component.scss']
})
export class ProfileComponent {
  mode: string = "";
  empDtls: UserProfile = {
    empID: "",
    fullname: "",
    email: "",
    showPassword: false,
    contact: "",
    role: "",
    status: "",
  };
  loading: boolean;
  user: IUser;
  userGroup: any[];

  roles:any[] =[
    { value:'admin', label: 'Admin'},
    { value:'staff', label: 'Staff'}
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService, 
    private messageService: MessageService,
    private cognitoService: CognitoService,
  ){
    let details = this.router.getCurrentNavigation()?.extras.state;
    if (details) {
      this.empDtls.empID = details['empID'];
      this.empDtls.fullname = details['fullname'];
      this.empDtls.email = details['email'];
      this.empDtls.contact = details['contact'];
      this.empDtls.role = details['role'];
    }
    this.loading = false;
    this.user = {} as IUser;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.mode = params['mode'];
        if (this.mode === 'self') {
          // api to get profile details
          // dummy data
          this.empDtls = {
            empID: 'P1234456',
            fullname : "Alvin Tans",
            email : "alvin.tan@wbms.com.sg",
            showPassword: false,
            contact: "98765432",
            role: "staff",
            status: "",
          }
        } else if (this.mode !== 'create') {
          // check admin rights
          // enable admin features
          if (this.mode == 'view') {
            this.empDtls.password = '1234567890'
          }
        } else {
          // check admin rights to create profile
        }
      }
      else {
        // for testing with aws (if no router params)
        this.cognitoService.getUser()
        .then((user: any) => {
          this.user = user.attributes;
          this.cognitoService.getUserGroups()
          .then((userGrp: any) => {
            this.userGroup = userGrp;
            this.messageService.add({
              severity: "warn",
              summary: "user info",
              detail: userGrp,
              sticky: false,
            }); 
            console.log("user, usergrp", user, this.userGroup);
          });      
        });
      }
    })         
  }

  saveBtn() {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to save the changes?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.update();
        }
    });
  }

  createBtn() {
    
  }

  public update(): void {
    this.loading = true;

    this.cognitoService.updateUser(this.user)
    .then(() => {
      this.loading = false;
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Changes have been saved.' });
    }).catch(() => {
      this.loading = false;
      this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Idk why ask aws.' });
    });
  }
}
