import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ProfileComponent } from "./profile.component";
import { PROFILE_CHILD_ROUTE } from "./profile.route";

@NgModule({
    declarations: [
        ProfileComponent,
    ],
    imports: [
        RouterModule.forChild(PROFILE_CHILD_ROUTE),
    ],
    exports: [
        ProfileComponent
    ],
    schemas: [],
    providers: []
})

export class ProfileModule {}