// product.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Product } from '../model/product';
import { LocalStorageService } from './localstorage.service'; // Import LocalStorageService

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // apiUrl = 'https://pushpakdronevimanshopbackend.onrender.com/api/products'; // Adjust the URL to your API
  // apiUrl = 'http://localhost:8000/api/products'; // Adjust the URL to your API
  apiUrl = 'https://pushpakdronevimanshopbackend.vercel.app/api/products'; // Adjust the URL to your API

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService // Inject LocalStorageService
  ) {}

  // Helper method to create headers with the JWT token
  private getHeaders(): HttpHeaders {
    const data = this.localStorageService.getItem<{ token: string }>('pushpakuserdata');
    const token = data ? data.token : '';
    
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // Transform method to change _id to id
  private transformId(product: any): Product {
    return { ...product, id: product._id };
  }

  // Add Product
  addProduct(product: Product): Observable<any> {
    // console.log(product);
    const headers = this.getHeaders();
    return this.http.post<any>(this.apiUrl, product, { headers });
  }

  // Get all products, map _id to id for consistent use of id
  getProducts(): Observable<Product[]> {

    
    
    const headers = this.getHeaders();
    return this.http.get<Product[]>(this.apiUrl, { headers }).pipe(
      map(products => products.map(product => this.transformId(product)))
    );
  }

  // Get a single product, map _id to id
  getProduct(id: string): Observable<Product> {
    const headers = this.getHeaders();
    return this.http.get<Product>(`${this.apiUrl}/${id}`, { headers }).pipe(
      map(product => this.transformId(product))
    );
  }

  // Update a product
  updateProduct(id: string, product: Product): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.apiUrl}/${id}`, product, { headers });
  }

  // Delete a product
  deleteProduct(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
  }

  // Search products
  searchProducts(keyword: string): Observable<Product[]> {
    const headers = this.getHeaders();
    return this.http.get<Product[]>(`${this.apiUrl}/search/${keyword}`, { headers }).pipe(
      map(products => products.map(product => this.transformId(product)))
    );
  }

  // Update the sold count for a product
  updateSoldCount(id: number, soldCount: number): Observable<Product> {
    const headers = this.getHeaders();
    return this.http.put<Product>(`${this.apiUrl}/updatesold/${id}?soldCount=${soldCount}`, null, { headers });
  }

  // Get top 4 sold products
  // getTop4SoldProducts(): Observable<Product[]> {
  //   const headers = this.getHeaders();
  //   return this.http.get<Product[]>(`${this.apiUrl}/topsold`, { headers }).pipe(
  //     // If you're processing or transforming the products' data
  //     map(products => {
  //       // Map through the array and transform each product
  //       return products.map(product => this.transformId(product));
  //     }),
  //     catchError(error => {
  //       console.error('Error fetching top sold products:', error);
  //       return of([]); // Return an empty array on error
  //     })
  //   );
  // }
}
