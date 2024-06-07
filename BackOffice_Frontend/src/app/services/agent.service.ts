import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agent } from '../model/agent.model';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private backendHost : string = "http://localhost:port-backend";

  constructor(private http: HttpClient) { }

  createAgent(agent: Agent): Observable<Agent> {
    return this.http.post<Agent>(`${this.backendHost}/agents`, agent);
  }

  getAgents(): Observable<Agent[]> {
    return this.http.get<Agent[]>(`${this.backendHost}/agents`);
  }
}
