import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class WorkspaceService {

    apiUrl = 'http://localhost:8083/api/workspace';
    
  constructor(
        private http: HttpClient
    ) { }


    findAll(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/testWorkspaceDb`);
    }

    getWorkspaceById(id:any): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/getWorkspaceById/${id}`);
    }
}