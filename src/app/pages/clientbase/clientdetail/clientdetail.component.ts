import { Component, OnInit } from '@angular/core';
import { Helper } from 'src/app/global/helper';

@Component({
  selector: 'app-clientdetail',
  templateUrl: './clientdetail.component.html',
  styleUrls: ['./clientdetail.component.less']
})
export class ClientdetailComponent implements OnInit {

  ClientID: number;
  constructor() { }

  ngOnInit(): void {
    try
    {
      this.ClientID = parseInt(Helper.GetQueryStringParameter("ClientID"));
      alert(this.ClientID);
    }
    catch (Ex: any)
    {
      console.log(Ex)
    }
    
    
  }

}
