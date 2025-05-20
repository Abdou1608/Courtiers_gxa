import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CourtierService {
  private readonly baseUrl = 'https://api.gxa.com';

  constructor(private http: HttpClient) {}

  getDossiers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/courtiers/Dossiers`);
  }

  getProduits(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/courtiers/produits`);
  }

  getCommissions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/courtiers/commissions`);
  }
}