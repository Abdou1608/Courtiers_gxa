import { Injectable } from "@angular/core";
import * as Xpath from "xpath";
import { BasSoapFault } from "./BasSoapFault";

export class BasSecurityContext {

    private _SessionId: string = "";
    public get SessionId(): string {
        return this._SessionId;
    }
    public set SessionId(value: string) {
        this._SessionId = value;
    }
    private _IsAuthenticated: boolean = false;
    public get IsAuthenticated(): boolean {
        return this._IsAuthenticated;
    }
    public set IsAuthenticated(value: boolean) {
        this._IsAuthenticated = value;
    }

    constructor() {
    }

    public LoadFromXml(xmlstring: string) {
        try {
            let XmlParser: DOMParser = new DOMParser();
            let XmlDoc: Document = XmlParser.parseFromString(xmlstring, 'application/xml');
            let XPathSelect: Xpath.XPathSelect = Xpath.useNamespaces(
                {
                    "envlp": "http://schemas.xmlsoap.org/soap/envelope/",
                    "lg": "http://belair-info.com/bas/services"
                }
            );
            let val: any = XPathSelect("//envlp:Envelope/envlp:Body/lg:BasSecurityContext", XmlDoc);
            if (val.length > 0) {
                let valSessionId: any = XPathSelect("//envlp:Envelope/envlp:Body/lg:BasSecurityContext/SessionId", XmlDoc);
                if (valSessionId.length > 0) {
                    if ((valSessionId[0] as Node).textContent !== null)
                        this.SessionId = String((valSessionId[0] as Node).textContent);
                }
                let valIsAuthenticated: any = XPathSelect("//envlp:Envelope/envlp:Body/lg:BasSecurityContext/IsAuthenticated", XmlDoc);
                if (valIsAuthenticated.length > 0) {
                    if ((valIsAuthenticated[0] as Node).textContent !== null)
                        this.IsAuthenticated = Boolean((valIsAuthenticated[0] as Node).textContent);
                }
            }
            else {
                BasSoapFault.ThrowError(xmlstring);
            }
        }
        catch (e: any) {
            throw new Error(e.message);
        }
    }

    public GetSessionId(): string {
        return this.SessionId;
    }

    public GetIsAuthenticated(): boolean {
        return this.IsAuthenticated;
    }

    public ToSoapVar(): string
    {
        return `<sc xsi:type="ns1:BasSecurityContext"><SessionId xsi:type="xsd:string">${this.SessionId}</SessionId><IsAuthenticated xsi:type="xsd:boolean">${this.IsAuthenticated}</IsAuthenticated></sc>`
    }

    public Clean() {
        this.SessionId = "";
        this.IsAuthenticated = false;
    }

}
