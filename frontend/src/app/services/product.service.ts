import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products/allproducts';
  private apiUrl2 = 'http://localhost:3000/products/product';
  private apiUrl3 = 'http://localhost:3000/products/categories';
  private apiUrl4 = 'http://localhost:3000/products/addproduct';
  private apiUrl5 = 'http://localhost:3000/products/removeproduct';
  private apiUrl6 = 'http://localhost:3000/cart/addtocart';
  private apiUrl7 = 'http://localhost:3000/user/count';
  private apiUrl8 = 'http://localhost:3000/products/count';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl2}/${id}`);
  }

  getProductByCategory(category: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl3}/${category}`);
  }

  addProduct(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });

    return this.http.post<any>(`${this.apiUrl4}`, formData, { headers });
  }

  removeProduct(id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });

    return this.http.delete<any>(`${this.apiUrl5}/${id}`, { headers });
  }

  addtocart(payload: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(`${this.apiUrl6}`, payload, {
      headers,
    });
  }

  getTotalUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl7);
  }

  getTotalProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl8);
  }
}
