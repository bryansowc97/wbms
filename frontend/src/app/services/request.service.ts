import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environment";
import { NFacilityBooking, NFacilitySeat } from "../workspace/workspace.model";


@Injectable({
    providedIn: 'root'
})
export class RequestService {
    apiUrl: any = environment.api;

    constructor(
        private http: HttpClient
    ) {
    }
    
    // Find (http.get)
    // find<T>(url: string): Observable<HttpResponse<T>> {
    //     return this.http.get<T>(`${environment.apiUrl + url}`, { observe: 'response' });
    // }

    find<T>(url: string, service: string): any {
        return this.http.get(`${this.apiUrl[service] + url}`);
    }

    // Query (http.get with params)
    getWithParams<T>(url: string, service: string, param?: any): Observable<any> {
        const options = this.createRequestOption(param);
        return this.http.get(`${this.apiUrl[service] + url}`, { params: options });
    }

    // Create (http.post)
    create<T>(url: string, service: string, param?: any): Observable<any> {
        return this.http.post<T>(`${this.apiUrl[service] + url}`, param);
    }

    // Put (http.put)
    put<T>(url: string, service: string, param?: any): Observable<any> {
        return this.http.put<T>(`${this.apiUrl[service] + url}`, param);
    }

    createRequestOption(req?: any): HttpParams {
        let options: HttpParams = new HttpParams();
        if (req) {
            Object.keys(req).forEach(key => {
                if (req[key] !== null && req[key] !== undefined) {
                    options = options.set(key, req[key])
                }
            });
            // To add more logic for sorting if we need it
        }
        return options;
    }

    createBooking(selectedResourceDTL: NFacilityBooking): void{
        console.log('selectedResourceDTL', selectedResourceDTL);
    // Promise<any> {
        // return ;
        // return this.cognitoService.getUserDetails()
        // .then((user: any) => {
        // // console.log("User details:", user);
        // const params = {
        //     schAdmin: user.email,
        //     schEntryReqmt: schEntryReqmt
        // };
        // return lastValueFrom(this.http.post(`${this.baseUrl}/createSchEntryReqmt`, { params })); // convert Observable to Promise
        // });
    }
}