import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/app/home.component';
import { CreateWorkspaceComponent } from './workspace/create_workspace/create_workspace.component';
import { ProfileDashboardComponent } from './profile/profile-dashboard/profile-dashboard.component';
import { BookingComponent } from './booking/booking.component';
import { LoginComponent } from './login/login.component';
import { WorkspaceDashboardComponent } from './workspace/workspace-dashboard/workspace-dashboard.component';
import { ProfileComponent } from './profile/create-edit-profile/create-edit-profile.component';
import { SignUpComponent } from './sign-up/sign-up.component';


 const ROOT_ROUTES: Routes = [
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   redirectTo: 'home'
  // },
  { path: '', 
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signUp',
    component: SignUpComponent,
  },
  {
    path: '**',
    redirectTo: 'login',
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
    path: 'profileDashboard',
    component: ProfileDashboardComponent
    // loadChildren: () => import('src/app/profile/profile.module').then(m => m.ProfileModule)
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
