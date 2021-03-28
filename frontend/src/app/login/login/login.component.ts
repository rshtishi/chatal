import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthenticationRequest} from "../../model/chatal.model";
import {AuthService} from "../../services/auth.service";
import {AppSettings} from "../../app.settings";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  request:AuthenticationRequest={};

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
  }

  signIn(){
    console.log(this.request);
    this._authService.authenticate(this.request).subscribe( response=> {
        console.log(response);
    });
  }



}
