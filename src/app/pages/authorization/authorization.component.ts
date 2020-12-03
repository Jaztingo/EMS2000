import { Component, OnInit } from '@angular/core';
import { RestModuleLink } from 'src/app/global-models';
import { RestModuleService } from 'src/app/rest-module.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.less']
})
export class AuthorizationComponent implements OnInit {
  userName: string = "";
  password: string = "";
  RestModule: RestModuleService;
  RestModuleLinks: RestModuleLink;
  constructor() {
    this.RestModule = new RestModuleService();
    this.RestModuleLinks = new RestModuleLink();
  }

  ngOnInit(): void {
    console.log("Authorization Loaded");
  }

  login(): void {
    let _this = this;
    let obj = {
      "Username": _this.userName,
      "Password": _this.password
    };

    this.RestModule.channel(false, this.RestModuleLinks.Login, obj, null).then(function (data) {
      console.log(data);
      if (data.logicStatus == 0) {
        window.location.href = "/";
        _this.RestModule.SetToken(data.token)
        //Global.SetLocation("");
      }
      else {

        alert("არასწორი მონაცემები");
      }

    })

  }
}
