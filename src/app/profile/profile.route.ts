import { Routes } from "@angular/router";
import { ProfileComponent } from "./profile.component";

export const PROFILE_CHILD_ROUTE: Routes = [
    {
        path: '',
        component: ProfileComponent,
        children: []
    }
]