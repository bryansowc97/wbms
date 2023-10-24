import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../booking/booking.model';
import { RequestService } from './request.service';

@Injectable()

export class BookingService {

    apiUrl = 'http://localhost:8081/api/booking';
    bookingApi = 'booking'
    
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
        return this.requestService.create(`/updateBooking/`, this.bookingApi, booking);
    }  
}