import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agent } from '../model/agent.model';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private backendHost = 'http://localhost:port-backend/agents';

  constructor(private http: HttpClient) { }

  createAgent(agent: Agent): Observable<Agent> {
    const formData = new FormData();
    formData.append('firstName', agent.firstName);
    formData.append('lastName', agent.lastName);
    formData.append('email', agent.email);
    formData.append('phone', agent.phone);
    formData.append('cinFront', agent.cinFront as File);
    formData.append('cinBack', agent.cinBack as File);

    return this.http.post<Agent>(this.backendHost, formData);
  }

  getAgents(): Observable<Agent[]> {
    return this.http.get<Agent[]>(this.backendHost);
  }
}
