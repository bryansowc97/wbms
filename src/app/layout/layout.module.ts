import { NgModule } from "@angular/core";
import { NavbarModule } from "./navbar/navbar.module";
import { FooterComponent } from "./footer/footer.component";
import { LAYOUT_CHILD_ROUTE } from "./layout.route";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations:[
        FooterComponent
    ],
    imports:[
        NavbarModule,
        RouterModule.forChild(LAYOUT_CHILD_ROUTE)
    ],
    exports:[
        FooterComponent
    ]
})

export class LayoutModule { }