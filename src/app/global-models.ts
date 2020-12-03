

export class RestModuleLinkObject {
    method: string;
    link: string;

}
export class RestModuleLink {
    Login: RestModuleLinkObject = {
        link: "login",
        method: "POST"
    }
    LogOut: RestModuleLinkObject = {
        link: "login",
        method: "DELETE"
    }
    GetFrameData: RestModuleLinkObject = {
        link: "agent",
        method: "GET"
    }
    SearchClientFilterData: RestModuleLinkObject = {
        link: "clientfilter",
        method: "GET"
    }
    GetClientList: RestModuleLinkObject = {
        link: "client?ClientName={0}&ClientPhone={1}&ProductID={2}&StatusID={3}&OwenerAgentID={4}&StartDateCR={5}&EndDateCR={6}&StartDateRem={7}&EndDateRem={8}&PageNumber={9}",
        method: "GET"
    }
    SearchClient: RestModuleLinkObject = {
        link: "client/{0}",
        method: "GET"
    }
}

export class PagerRowModel {
    PageNumber: number;
    IsDivader: boolean;
    IsCurrent: boolean;
}