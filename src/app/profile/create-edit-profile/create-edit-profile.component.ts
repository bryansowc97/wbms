import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfile } from 'src/app/models/profile.model';
import { ConfirmationService, MessageService } from 'primeng/api';
   
@Component({
  selector: 'app-profile',
  templateUrl: './create-edit-profile.component.html',
  styleUrls: ['./create-edit-profile.component.scss']
})
export class ProfileComponent {
  mode: string = "";
  empDtls: UserProfile = {
    empID: "",
    fullname : "",
    email : "",
    showPassword: false,
    contact: "",
    role: "",
    status: "",
  };

  roles:any[] =[
    { value:'admin', label: 'Admin'},
    { value:'staff', label: 'Staff'}
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService, 
    private messageService: MessageService
  ){
    let details = this.router.getCurrentNavigation()?.extras.state;
    if (details) {
      this.empDtls.empID = details['empID'];
      this.empDtls.fullname = details['fullname'];
      this.empDtls.email = details['email'];
      this.empDtls.contact = details['contact'];
      this.empDtls.role = details['role'];
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
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
    })
  }

  saveBtn() {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to save the changes?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Changes have been saved.' });
        }
    });
  }

  createBtn() {
    
  }
}
