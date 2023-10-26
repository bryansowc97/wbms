import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfile } from 'src/app/models/profile.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CognitoService, IUser } from 'src/app/cognito.service';
import { Auth } from 'aws-amplify';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'create-edit-profile.component.html',
  styleUrls: ['create-edit-profile.component.scss']
})
export class ProfileComponent {
  mode: string = "";
  empDtls: UserProfile = {
    // empID: "",
    username: "",
    name: "",
    email: "",
    showPassword: false,
    contact: "",
    role: "",
    status: "",
  };
  loading: boolean;
  user: IUser;
  selectedUsername: any;
  userGroup: any[];
  isConfirm: boolean;
  isLoading: boolean = true;

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
    private authService: AuthenticationService
  ){
    let details = this.router.getCurrentNavigation()?.extras.state;
    if (details) {
      // this.empDtls.empID = details['empID'];
      this.empDtls.username = details['username'];
      this.empDtls.name = details['name'];
      this.empDtls.email = details['email'];
      this.empDtls.contact = details['contact'];
      this.empDtls.role = details['role'];
    }
    this.user = {} as IUser;
  }

  async ngOnInit(): Promise<void> {
    this.route.queryParams.subscribe(async params => {
      if (params) {
        this.mode = params['mode'];
        this.selectedUsername = params['username']
        if (this.mode === 'self') {
          await this.loadOwnProfile();
        } else if (this.mode === 'edit' || this.mode == 'view') {
          await this.loadOtherProfile();
        } else if (this.mode === 'create') {
          this.isLoading = false;
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Semething went wrong' });
          this.router.navigate(['/booking']);
        }
      }
      else {
        // for testing with aws (if no router params)
        this.cognitoService.getCurrentUser()
        .then((user: any) => {
          this.user = user.attributes;
          this.cognitoService.getCurrentUserGroups()
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
    this.loading = true;
    this.cognitoService.signUp(this.user)
      .then(() => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Account created. Please Login.' });
        this.router.navigate(['/profileDashboard']);
      }).catch(() => {
      this.loading = false;
      this.messageService.add({ severity: 'error', summary: 'Unknown', detail: 'Please try again later.' });
    });
  }

  // refreshPage(delay: number) {
  //   setTimeout(() => {
  //     location.reload();
  //   }, delay);
  // }

  public update(): void {
    this.user.contact = this.authService.validatePhoneNum(this.user.contact);
    if (this.user.contact == '') {
      this.messageService.add({ severity: 'error', summary: 'Wrong contact format', detail: 'Try again' });
      return;
    }
    if (!this.authService.validateEmail(this.user.email)) {
      this.messageService.add({ severity: 'error', summary: 'Wrong email format', detail: 'Try again' });
      return;
    }
    
    this.loading = true;
    this.cognitoService.updateUser(this.user)
    .then(() => {
      this.loading = false;
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Changes have been saved.' });
      // this.refreshPage(3000);
    }).catch(() => {
      this.loading = false;
      this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Idk why ask aws.' });
    });
  }


  public loadOwnProfile() {
    Auth.currentAuthenticatedUser()
      .then(user => {
        // // Access user attributes in the 'attributes' property
        // this.user = user.attributes;
        // this.user.contact = user.attributes.phone_number;
        // this.user.username = user.username;
        // this.cognitoService.getUserGroups()
        //   .then((userGrp: any) => {
        //     this.user.role = userGrp[0];
        //     console.log("user, usergrp", user, this.userGroup);
        //     this.isLoading = false;
        //   });
        this.selectedUsername = user.username;
        this.loadOtherProfile();
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
        this.isLoading = false;
      });
  }

  public loadOtherProfile() {
    this.cognitoService.findUserAndAttributesByUsername(this.selectedUsername)
      .then(userData => {
        // Access user attributes in the 'attributes' property
        this.user = {} as IUser;
        userData.UserAttributes.forEach(attribute => {
          this.user[attribute.Name] = attribute.Value;
        });
        this.user.contact = this.user.phone_number;
        this.user.username = userData.Username;
        if (userData.UserGroups && userData.UserGroups.length > 0) {
          this.user.role = userData.userGroups[0];
        }
        console.log("user, usergrp", userData);
        this.isLoading = false;
        // this.cognitoService.getCurrentUserGroups()
        //   .then((userGrp: any) => {
        //     if (userGrp && userGrp.length > 0) {
        //       this.user.role = userGrp[0];
        //     }
        //     console.log("user, usergrp", userData, this.userGroup);
        //     this.isLoading = false;
        //   });
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
        this.isLoading = false;
      });
  }

}
