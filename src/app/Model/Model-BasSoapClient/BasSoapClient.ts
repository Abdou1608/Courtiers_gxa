import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from "@angular/common/http";
import { catchError, firstValueFrom, map, Observable, retry, throwError, timeout } from 'rxjs';
import { BasSoapFault } from "../BasSoapObject/BasSoapFault";

@Injectable({
    providedIn: 'root',
  })
export class BasSoapClient {

    private SoapHeader!: string;
    private SoapFooter!: string;

    constructor(private http: HttpClient) {
        this.SoapHeader = "";
        this.SoapFooter = "";
    }

    async GetFileContent(file: string): Promise<any> {
        return await this.http.get(file, { responseType: 'text' }).toPromise();
    }

    HeaderAndFooterLoaded(): Boolean {
        return ((this.SoapFooter === "") && (this.SoapHeader == ""));
    }

    async LoadHeaderAndFooter(): Promise<void> {
        this.SoapHeader = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
        this.SoapHeader += " <SOAP-ENV:Envelope xmlns:SOAP-ENV=\"http://schemas.xmlsoap.org/soap/envelope/\"";
        this.SoapHeader += " xmlns:ns1=\"http://belair-info.com/bas/services\"";
        this.SoapHeader += " xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"";
        this.SoapHeader += " xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"";
        this.SoapHeader += " xmlns:SOAP-ENC=\"http://schemas.xmlsoap.org/soap/encoding/\"";
        this.SoapHeader += " SOAP-ENV:encodingStyle=\"http://schemas.xmlsoap.org/soap/encoding/\">";
        this.SoapHeader += " <SOAP-ENV:Body>";
        this.SoapFooter = "</SOAP-ENV:Body></SOAP-ENV:Envelope>";
    }

    async SoapRequest(url: string, request: string): Promise<string> {
        if (this.HeaderAndFooterLoaded()) {
            this.LoadHeaderAndFooter();
        }
        let soapenv: string = this.SoapHeader + request + this.SoapFooter;
        try {
            const response = await firstValueFrom(this.http.post(url, soapenv, {
                headers: new HttpHeaders(),
                responseType: 'text',
                observe: 'response',
            }));
            if (response.status !== 200) {
                if (response.body !== null)
                    throw response.body;
                else
                    throw "Error Soap Request";
            }
            else {
                if (response.body !== null)
                    return response.body;
            }
            return "";
        }
        catch (error: any) {
            let s: HttpErrorResponse = error;
            throw s.message;
        }
    }

    async SoapVoidRequest(url: string, request: string): Promise<void> {
        if (this.HeaderAndFooterLoaded()) {
            this.LoadHeaderAndFooter();
        }
        let soapenv: string = this.SoapHeader + request + this.SoapFooter;
        try {
            const response = await firstValueFrom(this.http.post(url, soapenv, {
                headers: new HttpHeaders(),
                responseType: 'text',
                observe: 'response',
            }));
            if (response.status === 200) {
                if (response.body !== null) {
                    if (BasSoapFault.IsBasError(response.body)) {
                        BasSoapFault.ThrowError(response.body);
                    }
                }
            }
        }
        catch (error: any) {
            throw error;
        }
    }

   new_SoapRequest(url: string, request: string): Observable<string> {
        if (this.HeaderAndFooterLoaded()) {
            this.LoadHeaderAndFooter();
        }
    
        const soapenv: string = this.buildSoapEnvelope(request);
        console.log("HTTP REQUEST:!!!=="+JSON.stringify(soapenv))
        return this.http.post(url, soapenv,{
            headers: new HttpHeaders(),
            responseType: 'text',
            observe: 'response',
        }).pipe(
            timeout(100000),
            retry(2),
            map((response: HttpResponse<string>) => {
                console.log("HTTP RESPONSES:!!!=="+JSON.stringify(response))
                if (response.status !== 200) {
                
                    throw response.body ?? "Error Soap Request";

                }
                return response.body ?? "";
            }),
            catchError((error: HttpErrorResponse) => {
                console.error("SOAP request error:", {
                    message: error.message,
                    status: error.status,
                    error: error.error
                });
                return throwError(() => error.message);
            })
        );
    }
    
    private buildSoapEnvelope(request: string): string {
        return this.SoapHeader + request + this.SoapFooter;
    }
    
    private getHttpOptions() {
        return {
            headers: new HttpHeaders(),
            responseType: 'text',
            observe: 'response'
        };
    }
    
    New_SoapRequest(url: string, request: string): Observable<string> {
        if (this.HeaderAndFooterLoaded()) {
          this.LoadHeaderAndFooter();
        }
      
        const soapenv: string = this.SoapHeader + request + this.SoapFooter;
      
        return this.http.post(url, soapenv, {
          headers: new HttpHeaders(),
          responseType: 'text',
          observe: 'response'
        }).pipe(
          map(response => {
            if (response.status !== 200 || response.body === null) {
              throw new Error(response.body ?? 'Error Soap Request');
            }
            return response.body;
          }),
          catchError((error: HttpErrorResponse) => throwError(() => new Error(error.message)))
        );
      }
      

}