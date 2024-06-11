import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SmsService {
  private apiUrl = 'http://localhost:8080/api/sms'; // URL to web API

  constructor(private http: HttpClient) { }

  sendSms(to: string, message: string): Observable<string> {
    const params = { to, message };
    return this.http.post<string>(`${this.apiUrl}/send`, null, { params });
  }

  verifyOtp(sentOtp: string, receivedOtp: string): Observable<string> {
    const params = { sentOtp, receivedOtp };
    return this.http.post<string>(`${this.apiUrl}/verify`, null, { params });
  }
}
