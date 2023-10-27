import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../booking/booking.model';
import { RequestService } from './request.service';
import { environment } from 'src/environment';

@Injectable()

export class BookingService {

    apiUrl: any = environment.api.booking;

  constructor(
        private http: HttpClient,
        private requestService: RequestService
    ) { }


    findAll(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/findAll`);
    }

    getBookingsByUser(empId:string): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/getBookingsByUser/${empId}`);
    }

    findById(Id:any): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/findById/${Id}`);
    }
    
    updateBooking(booking: Booking): Observable<any[]> {
        return this.requestService.create(`/updateBooking/`, this.apiUrl, booking);
    }  

    getBookingsByIds(idList: number[]): Observable<any[]> {
        return this.http.post<any[]>(`${this.apiUrl}/getBookingsByIds`, idList);
    }

    findByRescId(rescId:any, date:any): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/findByRescId/${rescId}/${date}`);
    }
}