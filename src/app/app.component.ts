import { Component, OnInit } from '@angular/core';
import { RestModuleLink } from './global-models';
import { RestModuleService } from './rest-module.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'EMS2000';
  Token: string;
  LoggedIn: boolean;
  UnAuthorizedPages: string[] = ["", "authorization"]

  AgentName: string;

  RestModule: RestModuleService;
  RestModuleLinks: RestModuleLink;
  constructor() {
    this.RestModule = new RestModuleService();
    this.RestModuleLinks = new RestModuleLink();
    this.LoggedIn = false;
  }

  ngOnInit(): void {
    console.log("Frame Loaded");
    let _this = this;
    this.Token = this.RestModule.GetToken();
    let PathName = window.location.pathname.replace("/", "");
    if (this.Token) {
      this.RestModule.channel(true, this.RestModuleLinks.GetFrameData, null, null).then(function (data) {
        if (data.status != 0) {
          _this.RestModule.SetToken("");
          window.location.href = "/";
        }
        else {
          _this.LoggedIn = true;
          _this.AgentName = data.agentName
        }
      })
    }
    else if (!this.UnAuthorizedPages.includes(PathName)) {
      window.location.href = "/";
    }


  }

  LogOut(): void {

    let _this = this;

    this.RestModule.channel(true, this.RestModuleLinks.LogOut, null, null).then(function () {
      _this.RestModule.SetToken("");
      window.location.href = "";
    });
  }
}
