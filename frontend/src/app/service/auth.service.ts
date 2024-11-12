// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private baseUrl = 'https://pushpakdronevimanshopbackend.onrender.com/api/users'; // Replace with your actual API URL
  // private baseUrl = 'http://localhost:8000/api/users'; // Replace with your actual API URL
  private baseUrl = 'https://pushpakdronevimanshopbackend.vercel.app/api/users'; // Replace with your actual API URL

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService // Inject LocalStorageService
  ) {}

  // Method to get authorization headers
  private getHeaders(): HttpHeaders {
    const data = this.localStorageService.getItem<{ token: string }>('pushpakuserdata');
    const token = data ? data.token : '';
    
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  signUp(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, user);
  }

  login(credentials: any): Observable<any> {
    // Store user data in LocalStorageService after successful login
    this.localStorageService.setItem('pushpakuserdata', JSON.stringify(credentials));
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  // Add Authorization header to the update user request
  updateUser(id: string, user: any): Observable<any> {
    const headers = this.getHeaders(); // Get the headers with the JWT token
    return this.http.put(`${this.baseUrl}/update/${id}`, user, { headers });
  }

  // Add Authorization header to the get user by id request
  getUserById(id: string): Observable<any> {
    const headers = this.getHeaders(); // Get the headers with the JWT token
    return this.http.get(`${this.baseUrl}/${id}`, { headers });
  }
}
