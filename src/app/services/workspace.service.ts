import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "src/environment";
import { NFacilitySeat } from '../workspace/workspace.model';
import { HttpRequest } from 'aws-sdk';

@Injectable()

export class WorkspaceService {

    apiUrl = 'http://localhost:8083/api/workspace';
    
    constructor(
        private http: HttpClient
    ) { }

    findAll(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/findAllWorkspace`);
    }

    getWorkspaceById(id:any): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/getWorkspaceById/${id}`);
    }

    // Query (http.get with params)
    findSubGpsByGp<T>(gp: string): Observable<HttpResponse<T>> {
        return this.http.get<T>(`${this.apiUrl}/findSubGpsByGp/${gp}`, { observe: 'response' });
    }

    // Query (http.get with params)
    getWorkspaceByGpAndSubGp<T>(gp: string, subGp: string): Observable<HttpResponse<T>> {
        return this.http.get<T>(`${this.apiUrl}/getWorkspaceByGpAndSubGp/${gp}/${subGp}`, { observe: 'response' });
    }

    // Create (http.post)
    create<T>(param : NFacilitySeat[]): Observable<HttpResponse<T>> {
        return this.http.post<T>(`${this.apiUrl}/createWorkspace`, param, { observe: 'response' });
    }

    // Update (http.put)
    update<T>(updateList: NFacilitySeat[], idListToDelete: number[]): Observable<HttpResponse<T>> {
        return this.http.post<T>(`${this.apiUrl}/updateWorkspace`, {updateList: updateList, idListToDelete: idListToDelete}, { observe: 'response' });
    }

    // delete
    delete<T>(idListToDelete: number[]): Observable<Object> {
        // const options = {
        //     headers: new HttpHeaders({
        //       'Content-Type': 'application/json',
        //     }),
        //     body: {
        //         idListToDelete: idListToDelete
        //     },
        //   };
        // this.http.delete(`${this.apiUrl}/deleteWorkspaceById`, options)
        return this.http.request('DELETE', `${this.apiUrl}/deleteWorkspaceById`, {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            }),
            body: idListToDelete
        });
    }
}