import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/app/home.component';
// import { errorRoute } from './layouts/error/error.route';
// import { navbarRoute } from './layouts/navbar/navbar.route';
// import { DEBUG_INFO_ENABLED } from 'app/app.constants';

// const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];
 const ROOT_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'workspace',
    loadChildren: () => import('src/app/workspace/workspace.module').then(m => m.WorkspaceModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('src/app/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'booking',
    loadChildren: () => import('src/app/booking/booking.module').then(m => m.BookingModule)
  }
 ]

@NgModule({
  imports: [
    RouterModule.forRoot(ROOT_ROUTES)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
