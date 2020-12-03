export class Helper {

    public static Month: string[] = ["იანვარი", "თებერვალი", "მარტი", "აპრილი", "მაისი", "ივნისი", "ივლისი", "აგვისტო", "სექტემბერი", "ოქტომბერი", "ნოემბერი", "დეკემბერი"]

    public static copy(obj: any) {
        var a = {};
        for (var x in obj) a[x] = obj[x];
        return a;
    }
    public static formateUnicorn(Initstring: string, args: string[]) {
        let theString = Initstring;
        for (var i = 0; i < args.length; i++) {
            var regEx = new RegExp("\\{" + (i) + "\\}", "gm");
            theString = theString.replace(regEx, args[i]);
        }
        return theString;
    }
    public static GeneratePageList(PageNumber: number, TotalPages: number) {
        let PagerList = [];
        let PageFirstOBJ = {
            PageNumber: 1,
            IsDivader: false,
            IsCurrent: false
        }
        let PageDivaderOBJ = {
            PageNumber: "...",
            IsDivader: true,
            IsCurrent: false
        }
        let PageLastOBJ = {
            PageNumber: TotalPages,
            IsCurrent: false
        }

        if (TotalPages < 7) {

            for (let i = 1; i <= TotalPages; i++) {
                let PageOBJ = {
                    PageNumber: i,
                    IsDivader: false,
                    IsCurrent: PageNumber == i
                }
                PagerList.push(PageOBJ);
            }
        }
        else {
            if (PageNumber <= 4) {
                for (let i = 1; i <= PageNumber + 1; i++) {

                    let PageOBJ = {
                        PageNumber: i,
                        IsDivader: false,
                        IsCurrent: PageNumber == i
                    }
                    PagerList.push(PageOBJ);
                }
                PagerList.push(PageDivaderOBJ);
                PagerList.push(PageLastOBJ);

            }
            else if (PageNumber > 4 && PageNumber < TotalPages - 4) {
                PagerList.push(PageFirstOBJ);
                PagerList.push(PageDivaderOBJ);
                for (let i = PageNumber - 1; i <= PageNumber + 1; i++) {
                    let PageOBJ = {
                        PageNumber: i,
                        IsDivader: false,
                        IsCurrent: PageNumber == i
                    }
                    PagerList.push(PageOBJ);
                }
                PagerList.push(PageDivaderOBJ);
                PagerList.push(PageLastOBJ);
            }
            else if (PageNumber >= TotalPages - 4) {
                PagerList.push(PageFirstOBJ);
                PagerList.push(PageDivaderOBJ);

                for (let i = PageNumber - 1; i <= TotalPages; i++) {
                    let PageOBJ = {
                        PageNumber: i,
                        IsDivader: false,
                        IsCurrent: PageNumber == i
                    }
                    PagerList.push(PageOBJ);
                }


            }

        }

        return PagerList;
    }

    public static _dateFormate(_date: any) {
        let temp = new Date(_date);
        const dateTimeFormat = new Intl.DateTimeFormat('ka-GE', {
            year: 'numeric',
            month: 'numeric',
            day: '2-digit',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        });
        return dateTimeFormat.formatToParts(temp);
    }
    public static dateTimeFormat(_date: any) {
        const temp = this._dateFormate(_date);

        let year = parseInt(temp.find(Element => Element.type == "year").value);
        let month = parseInt(temp.find(Element => Element.type == "month").value);
        let day = parseInt(temp.find(Element => Element.type == "day").value);
        let lang = 'geo';



        let RetVal = day + " " + this.Month[month - 1] + " " + year;
        return RetVal;
    }
    public static dateTimeFormatHourMunute(_date: any) {
        const temp = this._dateFormate(_date);

        let year = temp.find(Element => Element.type == "year").value;
        let month = temp.find(Element => Element.type == "month").value;
        let day = temp.find(Element => Element.type == "day").value;
        let hour = temp.find(Element => Element.type == "hour").value;
        let minute = temp.find(Element => Element.type == "minute").value;
        let second = temp.find(Element => Element.type == "second").value;
        let RetVal = day + "/" + month + "/" + year + " " + hour + ":" + minute;
        return RetVal;
    }
    public static dateTimeFormatLongHourMunute(_date: any) {
        const temp = this._dateFormate(_date);

        let year = parseInt(temp.find(Element => Element.type == "year").value);
        let month = parseInt(temp.find(Element => Element.type == "month").value);
        let day = parseInt(temp.find(Element => Element.type == "day").value);
        let hour = parseInt(temp.find(Element => Element.type == "hour").value);
        let minute = parseInt(temp.find(Element => Element.type == "minute").value);
        let second = parseInt(temp.find(Element => Element.type == "second").value);
        let lang = 'geo';
        let RetVal = day + " " + this.Month[month - 1] + " " + year + " " + hour + ":" + minute;
        return RetVal;
    }
    public static dateTimeFormatNumbers(_date: any) {
        const temp = this._dateFormate(_date);

        let year = parseInt(temp.find(Element => Element.type == "year").value);
        let month = parseInt(temp.find(Element => Element.type == "month").value);
        let day = parseInt(temp.find(Element => Element.type == "day").value);
        let RetVal = day + "/" + month + "/" + year;
        return RetVal;
    }
    public static GetQueryStringParameter(_param: string) {

        let url = window.location.href;
        _param = _param.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + _param + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

}
