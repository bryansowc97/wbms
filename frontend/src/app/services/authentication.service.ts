import { Injectable } from '@angular/core';

// import { environment } from 'src/environments/environment';
// import { Amplify, Auth } from 'aws-amplify';
import { Observable, throwError } from 'rxjs';
import { UserProfile } from '../models/profile.model';
import { RequestService } from './request.service';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  constructor(
    private requestService: RequestService
  ) {
  }

  public validatePassword(pass1: string, pass2: string): boolean {
    if (pass1 !== pass2) {
      return false;
    }
    return true;
  }

  public validatePhoneNum(phoneNumber: string): string {
    // Remove all non-digit characters from the input
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
  
    // Check if the cleaned phone number contains only digits and has a valid length
    if (/^\d{10,15}$/.test(cleanedPhoneNumber)) {
      // Format the phone number into E.164 format (+1234567890)
      const formattedPhoneNumber = `+${cleanedPhoneNumber}`;
      return formattedPhoneNumber;
    } else {
      // Return false for an invalid phone number
      return '';
    }
  }

  public validateEmail(email: string): boolean {
    // Regular expression for a basic email address format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  
    return emailRegex.test(email);
  }

  // For local only, not aws
  public testDb(): any {
    return this.requestService.find(`/testWorkspaceDb`, 'workspace');
  }
}
