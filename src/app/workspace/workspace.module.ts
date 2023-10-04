import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
// import { WORKSPACE_ROUTE } from "./workspace.route";
import { CreateWorkspaceComponent } from "./create_workspace/create_workspace.component";
import { WORKSPACE_CHILD_ROUTE } from "./workspace.route";

@NgModule({
    declarations: [
        CreateWorkspaceComponent
    ],
    imports: [
        RouterModule.forChild(WORKSPACE_CHILD_ROUTE)
    ],
    exports: [
        CreateWorkspaceComponent
    ],
    schemas: [],
    providers: []
})

export class WorkspaceModule {}