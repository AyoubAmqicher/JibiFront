import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Client } from "../model/client.model";

@Injectable({
    providedIn : 'root'
})
export class ClientService {
    private apiUrl = 'http://localhost:8080/api/clients';

    constructor(private http : HttpClient) {}

    createClient(clientData: FormData): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/create`, clientData);
    }

    getAllClients(): Observable<Client[]> {
        return this.http.get<Client[]>(`${this.apiUrl}/all`);
    }
}
