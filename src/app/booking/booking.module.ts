import { NgModule } from "@angular/core";
import { BookingComponent } from "./booking.component";
import { RouterModule } from "@angular/router";
import { BOOKING_CHILD_ROUTE } from "./booking.route";
import { FooterComponent } from "../layout/footer/footer.component";

@NgModule({
    declarations: [
        BookingComponent,
        FooterComponent
    ],
    imports: [
        RouterModule.forChild(BOOKING_CHILD_ROUTE),
    ],
    exports: [
        BookingComponent
    ],
    schemas: [],
    providers: []
})

export class BookingModule {}