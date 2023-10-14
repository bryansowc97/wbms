import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/app/home.component';
import { CreateWorkspaceComponent } from './workspace/create_workspace/create_workspace.component';
import { ProfileComponent } from './profile/profile.component';
import { BookingComponent } from './booking/booking.component';
import { LoginComponent } from './login/login.component';
import { WorkspaceDashboardComponent } from './workspace/workspace-dashboard/workspace-dashboard.component';
import { CreateBookingComponent } from './booking/create-booking/create-booking.component';



 const ROOT_ROUTES: Routes = [
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   redirectTo: 'home'
  // },
  { path: '', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'createWorkspace',
    component: CreateWorkspaceComponent
    // loadChildren: () => import('src/app/workspace/workspace.module').then(m => m.WorkspaceModule)
  },
  {
    path: 'workspaceDashboard',
    component: WorkspaceDashboardComponent
    // loadChildren: () => import('src/app/workspace/workspace.module').then(m => m.WorkspaceModule)
  },
  {
    path: 'profile',
    component: ProfileComponent
    // loadChildren: () => import('src/app/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'booking',
    component: BookingComponent
    // loadChildren: () => import('src/app/booking/booking.module').then(m => m.BookingModule)
  }
 ]

@NgModule({
  imports: [
    RouterModule.forRoot(ROOT_ROUTES)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
