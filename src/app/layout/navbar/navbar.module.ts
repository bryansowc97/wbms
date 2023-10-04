import { MenubarModule } from "primeng/menubar";
import { NavbarComponent } from './navbar.component';
import { NgModule } from '@angular/core';


@NgModule({
    declarations: [
        NavbarComponent,
    ],
    imports: [
        MenubarModule
    ],
    exports: [
        NavbarComponent
    ],
    schemas: [],
    providers: []
})

export class NavbarModule {}