import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Facture } from '../model/facture.model'; // Import the Facture model

@Injectable({
  providedIn: 'root'
})
export class FactureService {
  private apiUrl = 'http://localhost:8080/api'; // URL to web API

  constructor(private http: HttpClient) { }

  getUnpaidFacturesByClientId(clientId: string): Observable<Facture[]> {
    return this.http.get<Facture[]>(`${this.apiUrl}/factures/unpaid/${clientId}`);
  }

  getUnpaidFacturesByClientIdAndOperateurId(clientId: string, operateurId: number): Observable<Facture[]> {
    return this.http.get<Facture[]>(`${this.apiUrl}/factures/unpaidFactures`, { 
      params: { clientId, operateurId: operateurId.toString() }
    });
  }

  payFacture(factureId: number): Observable<Facture> {
    return this.http.put<Facture>(`${this.apiUrl}/factures/pay/${factureId}`, {});
  }

  getFactureById(factureId: number): Observable<Facture> {
    return this.http.get<Facture>(`${this.apiUrl}/factures/${factureId}`);
  }

  effectuerPaiement(clientId: string, factureId: number): Observable<string> {
    const url = `${this.apiUrl}/factures/effectuerPaiement?clientId=${clientId}&factureId=${factureId}`;
    return this.http.post<string>(url, {});
  }
  
}
