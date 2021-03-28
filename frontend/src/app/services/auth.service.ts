import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthenticationRequest, AuthenticationResponse} from "../model/chatal.model";
import {AppSettings} from "../app.settings";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private _httpClient: HttpClient) {
  }

  authenticate(request: AuthenticationRequest):Observable<boolean> {
    return this._httpClient.post<AuthenticationResponse>(AppSettings.AUTH_ENDPOINT, request).pipe(map(response => {
      console.log(response);
      if (response.authenticationToken) {
        //TO DO
        // save the response in the local storage
        return true;
      }
      return false;
    }));
  }


}
