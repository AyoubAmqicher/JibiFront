import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  public clientsState :any ={
    clients:[],
    status : "",
    errorMessage :""
  }

  public authState :any ={
    isAuthenticated : false,
    phone : undefined,
    roles : undefined,
    accessToken : undefined
  }

  constructor() { }

  public  setClientState(state :any):void {
    this.clientsState={...this.clientsState, ...state}
  }

  public setAuthState(state : any) :void{
    this.authState={...this.authState, ...state};
  }
}
