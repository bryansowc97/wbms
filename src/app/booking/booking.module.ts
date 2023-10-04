import { NgModule } from "@angular/core";
import { BookingComponent } from "./booking.component";
import { RouterModule } from "@angular/router";
import { BOOKING_CHILD_ROUTE } from "./booking.route";
import { FooterComponent } from "../layout/footer/footer.component";
import { ButtonModule } from 'primeng/button';
import { NavbarComponent } from "../layout/navbar/navbar.component";
import { MenubarModule } from "primeng/menubar";

@NgModule({
    declarations: [
        BookingComponent,
        FooterComponent,
        NavbarComponent
    ],
    imports: [
        ButtonModule,
        MenubarModule,
        RouterModule.forChild(BOOKING_CHILD_ROUTE),
    ],
    exports: [
        BookingComponent
    ],
    schemas: [],
    providers: []
})

export class BookingModule {}