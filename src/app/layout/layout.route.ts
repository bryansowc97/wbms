import { Routes } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';

export const LAYOUT_CHILD_ROUTE: Routes = [
    {
        path: '',
        component: FooterComponent,
        children: []
    }, 
    {
        path: '',
        component: NavbarComponent,
        children: []
    }
]

