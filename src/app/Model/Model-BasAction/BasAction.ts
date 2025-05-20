import { HttpClient } from "@angular/common/http";
import { BasParams } from "../BasSoapObject/BasParams";
import { BasSecurityContext } from "../BasSoapObject/BasSecurityContext";
import { BasSoapClient } from "../Model-BasSoapClient/BasSoapClient";
import * as Xpath from "xpath";
import { BasSoapFault } from "../BasSoapObject/BasSoapFault";
import { AppConfigService } from "../../Services/AppConfigService/app-config.service";
import { User } from "../user.model";
import { map, Observable } from "rxjs";

export class BasAction {

    constructor(private BasSoapCLient: BasSoapClient, private http: HttpClient, private appConfigService: AppConfigService) { }

    public async RunAction(actionName: string, basParams: BasParams, basSecurityContext: BasSecurityContext): Promise<string> {
        let body = "<ns1:RunAction>" + basSecurityContext.ToSoapVar() + `<name xsi:type=\"xsd:string\">${actionName}</name>`;
        body += basParams.ToSoapVar();
        body += '</ns1:RunAction>';         
        let response = await this.BasSoapCLient.SoapRequest(this.appConfigService.GetURlActionService(), body);
        if (BasSoapFault.IsBasError(response))
            BasSoapFault.ThrowError(response);
        return response;
    }

    public GetLogEntry(soapEnv: string): Array<string> {
        let result = new Array<string>();
        return  result;    
    }

    public GetDataFromSoapEnv(soapEnv: string): string {
        let XmlParser: DOMParser = new DOMParser();
        let XmlDoc: Document = XmlParser.parseFromString(soapEnv, 'application/xml');
        let XPathSelect: Xpath.XPathSelect = Xpath.useNamespaces(
            {
                "envlp": "http://schemas.xmlsoap.org/soap/envelope/",
                "lg": "http://belair-info.com/bas/services"
            }
        );
        let val: any = XPathSelect("//envlp:Envelope/envlp:Body/lg:BasActionResult/Data", XmlDoc) ;
        if ((val[0] as Node) !== undefined)
            return String((val[0] as Node).textContent);
        return "";
    }
   public parseSoapXmlToJson(xmlString: string): any {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
      
        // ✅ Trouve automatiquement la balise de données : <data>...</data>
        const dataElement = xmlDoc.getElementsByTagName('prods')[0];
        if (!dataElement) return {};
      
        const json: any = {};
        for (const node of Array.from(dataElement.children)) {
          const key = node.tagName;
          const value = node.textContent?.trim();
          json[key] = value ?? null;
        }
      
        return json;
      }

      public New_RunAction(actionName: string, basParams: BasParams, basSecurityContext: BasSecurityContext): Observable<any> {
        let body = "<ns1:RunAction>" + basSecurityContext.ToSoapVar() + `<name xsi:type=\"xsd:string\">${actionName}</name>`;
        body += basParams.ToSoapVar();
        body += '</ns1:RunAction>';         
      return this.BasSoapCLient.New_SoapRequest(this.appConfigService.GetURlActionService(), body).pipe
      (map(res =>{
        if (BasSoapFault.IsBasError(res))
            BasSoapFault.ThrowError(res);
        return res;
       })
    )   } ;

    public parseToJsonobj(xmlString: string, tag:string): any {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
        console.log("NONParsed Datas.....:"+xmlString)
      console.log("Parsed Datas.....:"+JSON.stringify(xmlDoc))
        // ✅ Trouve automatiquement la balise de données : <data>...</data>
        const dataElement = xmlDoc.getElementsByTagName(tag)[0];
        if (!dataElement) return {};
      
        const json: any = {};
        for (const node of Array.from(dataElement.children)) {
          const key = node.tagName;
          const value = node.textContent?.trim();
          json[key] = value ?? null;
        }
      
        return json;
      }
    
      
}