import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Agent } from "../model/agent.model";

@Injectable({
    providedIn : 'root'
})

export class AgentService {
    private apiUrl = 'http://localhost:8080/api/agents';
    constructor(private http : HttpClient){}

    createAgent(agentData : FormData): Observable<any>{
        return this.http.post<any>(`${this.apiUrl}/create`,agentData)
    }

    getAllAgents(): Observable<Agent[]> {
        return this.http.get<Agent[]>(`${this.apiUrl}/all`);
    }

    deleteAgentById(id: String): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
    }
    
    updateAgent(id: String, agentData: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/update/${id}`, agentData, {
            headers: { 'Content-Type': 'application/json' }
        });
    } 
    
}