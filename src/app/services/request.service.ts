import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environment";
import { FacilityBooking, FacilitySeat } from "../workspace/workspace.model";


@Injectable({
    providedIn: 'root'
})
export class RequestService {
    constructor(
        private http: HttpClient
    ) {
    }

    // Use the environment variable to construct the API URL
    SERVER_API_URL = environment.apiUrl;
    
    // Find (http.get)
    // find<T>(url: string): Observable<HttpResponse<T>> {
    //     return this.http.get<T>(`${this.SERVER_API_URL + url}`, { observe: 'response' });
    // }

    find<T>(url: string): any {
        return this.http.get(`${this.SERVER_API_URL + url}`);
    }

    // Query (http.get with params)
    query<T>(url: string, param?: any): Observable<HttpResponse<T>> {
        const options = this.createRequestOption(param);
        return this.http.get<T>(`${this.SERVER_API_URL + url}`, { params: options, observe: 'response' });
    }

    // Create (http.post)
    create<T>(url: string, param?: any): Observable<HttpResponse<T>> {
        return this.http.post<T>(`${this.SERVER_API_URL + url}`, param, { observe: 'response' });
    }

    // Update (http.put)
    update<T>(url: string, param?: any): Observable<HttpResponse<T>> {
        return this.http.put<T>(`${this.SERVER_API_URL + url}`, param, { observe: 'response' });
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

    createBooking(selectedResourceDTL: FacilityBooking): void{
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