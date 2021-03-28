import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthenticationRequest} from "../../model/chatal.model";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  request:AuthenticationRequest={};

  constructor(private _authServce: AuthService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
  }

  signIn(){
    console.log(this.request);
    this._authServce.authenticate(this.request).subscribe( response=> console.log(response));
  }

}
