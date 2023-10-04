

import { Routes } from '@angular/router';
import { CreateWorkspaceComponent } from './create_workspace/create_workspace.component';

export const WORKSPACE_CHILD_ROUTE: Routes = [
    {
        path: '',
        component: CreateWorkspaceComponent,
        children: []
    } 
]

