import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "src/environment";

@Injectable()

export class WorkspaceService {

    apiUrl: any = environment.api['workspace'];
    
    constructor(
        private http: HttpClient
    ) { }

    findAll(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/findAllWorkspace`);
    }

    getWorkspaceById(id:any): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/getWorkspaceById/${id}`);
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
    create<T>(url: string, service: string, param?: any): Observable<HttpResponse<T>> {
        return this.http.post<T>(`${this.apiUrl[service] + url}`, param, { observe: 'response' });
    }

    // Update (http.put)
    update<T>(url: string, service: string, param?: any): Observable<HttpResponse<T>> {
        return this.http.put<T>(`${this.apiUrl[service] + url}`, param, { observe: 'response' });
    }
}