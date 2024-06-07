import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Client } from "../model/client.model";

@Injectable({
  providedIn: 'root'
})

export class ClientService {
  private host : string ="http://localhost:port-backend/";
  constructor(private http: HttpClient) { }

  saveClient(client: Client):Observable<Client> {
    return this.http.post<Client>(`${this.host}/clients`, client);
  }
}
