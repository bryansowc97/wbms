// Import FusionCharts library and chart modules
// import * as FusionCharts from "fusioncharts";
// import * as charts from "fusioncharts/fusioncharts.charts";
// import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
// import { FusionChartsModule } from "angular-fusioncharts";

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { OverlayModule } from 'primeng/overlay';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
// import { NgxPaginationModule } from 'ngx-pagination';
import {MessagesModule} from 'primeng/messages';
import { TabViewModule } from 'primeng/tabview';
import { DividerModule } from 'primeng/divider';
import { FieldsetModule } from 'primeng/fieldset';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from "primeng/inputtext";
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PanelModule } from 'primeng/panel';
import { KeyFilterModule } from 'primeng/keyfilter';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { BookingComponent } from './booking/booking.component';
import { CreateWorkspaceComponent } from './workspace/create_workspace/create_workspace.component';
import { ProfileDashboardComponent } from './profile/profile-dashboard/profile-dashboard.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { TagModule } from 'primeng/tag';
import { WorkspaceDashboardComponent } from './workspace/workspace-dashboard/workspace-dashboard.component';
import { AuthenticationService } from './services/authentication.service';
import { RequestService } from './services/request.service';
import { MessageService } from 'primeng/api';
import { ProfileComponent } from './profile/create-edit-profile/create-edit-profile.component';
import { ConfirmationService } from 'primeng/api';
import {MatGridListModule} from '@angular/material/grid-list';

// import { SafePipe } from "./services/pipe/safe.pipe";

// Pass the fusioncharts library and chart modules
// FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme);
@NgModule({
  declarations: [
    AppComponent,
    BookingComponent,
    CreateWorkspaceComponent,
    ProfileDashboardComponent,
    LoginComponent,
    NavbarComponent,
    WorkspaceDashboardComponent,
    ProfileComponent
    // GenerateNameComponent,
    // LoginComponent,
    // SignupComponent,
    // AdminComponent,
    // SchoolAdminComponent,
    // StudentParentComponent,
    // ContactResultvaultAdminComponent,
    // UploadResultComponent,
    // ManageSchoolDashboardComponent,
    // SchoolInfoComponent,
    // ViewSchoolDashboardComponent,
    // ManageSchoolComponent,
    // ManageUserComponent,
    // AdminHomeComponent,
    // StudentParentHomeComponent,
    // SchoolAdminHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ButtonModule,
    MenubarModule,
    MenuModule,
    OverlayModule,
    BrowserAnimationsModule,
    OverlayPanelModule,
    TableModule,
    DropdownModule,
    ReactiveFormsModule,
    CardModule,
    CheckboxModule,
    TagModule,
    // FusionChartsModule,
    // NgxPaginationModule,
    MessagesModule,
    ToastModule,
    InputTextModule,
    RadioButtonModule,
    InputTextareaModule,
    AutoCompleteModule,
    PanelModule,
    KeyFilterModule,
    TabViewModule,
    DialogModule,
    CalendarModule,
    InputNumberModule,
    DividerModule,
    FieldsetModule,
    InputSwitchModule,
    ConfirmDialogModule,
    ToggleButtonModule,
    MatGridListModule
  ],
  providers: [
    // SafePipe
    RequestService,
    AuthenticationService,
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }