import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationRequest, AuthenticationResponse} from "../model/chatal.model";
import {AppSettings} from "../app.settings";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private _httpClient: HttpClient, private _localStorageSvc: LocalStorageService) {
  }

  authenticate(request: AuthenticationRequest): Observable<boolean> {
    return this._httpClient.post<AuthenticationResponse>(AppSettings.AUTH_ENDPOINT, request ).pipe(map(response => {
      console.log(response);
      if (response.authenticationToken) {
        this._localStorageSvc.set(AppSettings.AUTH_RESPONSE,response);
        return true;
      }
      return false;
    }));
  }


}
