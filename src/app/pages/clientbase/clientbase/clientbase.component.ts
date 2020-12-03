import { Component, OnInit } from '@angular/core';
import { Helper } from 'src/app/global/helper';

import { RestModuleLink, PagerRowModel } from 'src/app/global-models';
import { RestModuleService } from 'src/app/rest-module.service';
import { request } from 'https';


export class Dictionary {
  ID: string;
  Description: string;
}
export class ClientRowModel {
  clientID: number;
  clientName: string;
  clientStatus: string;
  crDate: string;
  lastComment: string;
  lastCommentProduct: string;
  lastCommentStatus: string;
  owenerAgent: string;
  phone: string;
  pid: string;
  reminderDate: string;
  locked: boolean;
}

@Component({
  selector: 'app-clientbase',
  templateUrl: './clientbase.component.html',
  styleUrls: ['./clientbase.component.less']
})
export class ClientbaseComponent implements OnInit {
  ProductList: Dictionary[];
  StatusList: Dictionary[];
  MyAndMyBoysList: Dictionary[];
  ClientList: ClientRowModel[];
  SearchedClientList: ClientRowModel[];
  PagerList: PagerRowModel[];
  Filter: any = {
    ClientName: "",
    ClientPhone: "",
    ProductID: "",
    StatusID: "",
    OwenerAgentID: "",
    DateCR: {
      startDate: "",
      endDate: ""
    },
    DateRem: {
      startDate: "",
      endDate: ""
    },
    PageNumber: 1
  };
  TotalRows: number;

  NewNumberSearch: string = "";
  SearchedClientBoxVisible: boolean = false;

  RestModule: RestModuleService;
  RestModuleLinks: RestModuleLink;
  constructor() {
    this.RestModule = new RestModuleService();
    this.RestModuleLinks = new RestModuleLink();
  }

  ngOnInit(): void {
    let _this = this;

    let RequestObject = Helper.copy(this.RestModuleLinks.SearchClientFilterData);
    this.RestModule.channel(true, RequestObject, null, null).then(function (data) {
      _this.ProductList = data.productList.map(function (item: any) {
        let RetVal: Dictionary = {
          Description: item.desc,
          ID: item.id
        }
        return RetVal;
      });
      _this.StatusList = data.statusList.map(function (item: any) {
        let RetVal: Dictionary = {
          Description: item.desc,
          ID: item.id
        }
        return RetVal;
      });
      _this.MyAndMyBoysList = data.myAndMyBoysList.map(function (item: any) {
        let RetVal: Dictionary = {
          Description: item.name,
          ID: item.id
        }
        return RetVal;
      });;
      _this.BindClientList();
    });
  }

  BindClientList(): void {
    let _this = this;
    _this.ClientList = [];
    let RequestObject = this.RestModuleLinks.GetClientList;

    let _StartDateCR = _this.Filter.DateCR.startDate;
    _StartDateCR = _StartDateCR == "" ? _StartDateCR : (_StartDateCR.getMonth() + 1) + "/" + _StartDateCR.getDate() + "/" + _StartDateCR.getFullYear();

    let _EndDateCR = _this.Filter.DateCR.endDate;
    _EndDateCR = _EndDateCR == "" ? _EndDateCR : (_EndDateCR.getMonth() + 1) + "/" + _EndDateCR.getDate() + "/" + _EndDateCR.getFullYear();

    let _StartDateREM = _this.Filter.DateRem.startDate;
    _StartDateREM = _StartDateREM == "" ? _StartDateREM : (_StartDateREM.getMonth() + 1) + "/" + _StartDateREM.getDate() + "/" + _StartDateREM.getFullYear();

    let _EndDateREM = _this.Filter.DateRem.endDate;
    _EndDateREM = _EndDateREM == "" ? _EndDateREM : (_EndDateREM.getMonth() + 1) + "/" + _EndDateREM.getDate() + "/" + _EndDateREM.getFullYear();



    RequestObject.link = Helper.formateUnicorn(RequestObject.link,
      [
        _this.Filter.ClientName,
        _this.Filter.ClientPhone,
        _this.Filter.ProductID,
        _this.Filter.StatusID,
        _this.Filter.OwenerAgentID,
        _StartDateCR,
        _EndDateCR,
        _StartDateREM,
        _EndDateREM,
        _this.Filter.PageNumber]);

    this.RestModule.channel(true, RequestObject, null, null).then((data) => {
      console.log(data);
      _this.ClientList = data.clientList.map(function (item: any) {

        let Client: ClientRowModel = {
          clientID: item.clientID,
          clientName: item.clientName,
          clientStatus: item.clientStatus,
          crDate: Helper.dateTimeFormatLongHourMunute(item.crDate),
          lastComment: item.lastComment,
          lastCommentProduct: item.lastCommentProduct,
          lastCommentStatus: item.lastCommentStatus,
          owenerAgent: item.owenerAgent,
          phone: item.phone,
          pid: item.pid,
          reminderDate: Helper.dateTimeFormat(item.reminderDate),
          locked: false
        };
        return Client;
      });

      let TotalPages = data.totalPages;
      let Pagenumber = parseInt(_this.Filter.PageNumber);
      _this.PagerList = Helper.GeneratePageList(Pagenumber, TotalPages);
      _this.TotalRows = data.totalRows;

    });
  }

  PagerClick(PagerItem: PagerRowModel): void {

    let _this = this;
    if (!PagerItem.IsDivader) {
      _this.Filter.PageNumber = PagerItem.PageNumber
      _this.BindClientList();
    }
  }


  ClientSearch(): void {
    let _this = this;
    let Pagenumber = this.Filter.PageNumber;
    if (!Pagenumber) {
      Pagenumber = 1
    }

    let RequestObject = this.RestModuleLinks.SearchClient;
    RequestObject.link = Helper.formateUnicorn(RequestObject.link, [_this.NewNumberSearch]);

    this.RestModule.channel(true, RequestObject, null, null).then((data) => {
      console.log(data);



      _this.SearchedClientBoxVisible = true;
      _this.SearchedClientList = data.clientList.map(function (item: any) {


        let Client: ClientRowModel = {
          clientID: item.clientID,
          clientName: item.clientName,
          clientStatus: item.clientStatus,
          crDate: Helper.dateTimeFormatLongHourMunute(item.crDate),
          lastComment: item.lastComment,
          lastCommentProduct: item.lastCommentProduct,
          lastCommentStatus: item.lastCommentStatus,
          owenerAgent: item.owenerAgent,
          phone: item.phone,
          pid: item.pid,
          reminderDate: Helper.dateTimeFormat(item.reminderDate),
          locked: item.locked
        };
        return Client;
      });
    });



  }

  CloseClientSearchbox(): void {
    let _this = this;
    _this.SearchedClientBoxVisible = false;
    _this.SearchedClientList = [];
    _this.NewNumberSearch = "";
  }
}
