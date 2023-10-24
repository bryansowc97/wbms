import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable()

export class WorkspaceService {

    apiUrl = environment.api.workspace;
    
  constructor(
        private http: HttpClient
    ) { }


    findAll(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/testWorkspaceDb`);
    }

    getWorkspaceById(id:any): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/getWorkspaceById/${id}`);
    }
}