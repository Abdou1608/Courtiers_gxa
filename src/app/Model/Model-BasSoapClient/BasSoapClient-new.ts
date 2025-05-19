import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, firstValueFrom, retryWhen, delay, take, throwError, timeout } from 'rxjs';
import { BasSoapFault } from '../BasSoapObject/BasSoapFault';

@Injectable({
  providedIn: 'root',
})
export class BasSoapClientNew {
  private SoapHeader: string = '';
  private SoapFooter: string = '';

  constructor(private http: HttpClient) {
    this.initializeHeaderAndFooter();
  }

  /**
   * Initialise l'en-tête et le pied SOAP.
   */
  private initializeHeaderAndFooter(): void {
    this.SoapHeader = `<?xml version="1.0" encoding="UTF-8"?>
      <SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"
                         xmlns:ns1="http://belair-info.com/bas/services"
                         xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                         xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/"
                         SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
        <SOAP-ENV:Body>`;
    this.SoapFooter = `</SOAP-ENV:Body></SOAP-ENV:Envelope>`;
  }

  /**
   * Effectue un appel GET pour récupérer un fichier texte.
   */
  async getFileContent(file: string): Promise<any> {
    return await firstValueFrom(
      this.http.get(file, { responseType: 'text' }).pipe(
        timeout(5000),
        retryWhen(errors => errors.pipe(delay(1000), take(2))),
        catchError(this.handleError)
      )
    );
  }

  /**
   * Vérifie si l'en-tête et le pied SOAP sont prêts.
   */
  private headerAndFooterLoaded(): boolean {
    return !(this.SoapHeader && this.SoapFooter);
  }

  /**
   * Effectue une requête SOAP et retourne la réponse texte.
   */
  async soapRequest(url: string, request: string): Promise<string> {
    if (this.headerAndFooterLoaded()) {
      this.initializeHeaderAndFooter();
    }

    const soapEnvelope = this.SoapHeader + request + this.SoapFooter;

    const response = await firstValueFrom(
      this.http.post(url, soapEnvelope, {
        headers: new HttpHeaders({ 'Content-Type': 'text/xml; charset=utf-8' }),
        responseType: 'text',
        observe: 'response'
      }).pipe(
        timeout(7000),
        retryWhen(errors => errors.pipe(delay(1000), take(3))),
        catchError(this.handleError)
      )
    );

    if (response.status !== 200) {
      throw new Error(`SOAP Request failed with status ${response.status}`);
    }

    if (response.body) {
      if (BasSoapFault.IsBasError(response.body)) {
        BasSoapFault.ThrowError(response.body);
      }
      return response.body;
    }

    return '';
  }

  /**
   * Effectue une requête SOAP qui n'attend pas de réponse.
   */
  async soapVoidRequest(url: string, request: string): Promise<void> {
    if (this.headerAndFooterLoaded()) {
      this.initializeHeaderAndFooter();
    }

    const soapEnvelope = this.SoapHeader + request + this.SoapFooter;

    await firstValueFrom(
      this.http.post(url, soapEnvelope, {
        headers: new HttpHeaders({ 'Content-Type': 'text/xml; charset=utf-8' }),
        responseType: 'text',
        observe: 'response'
      }).pipe(
        timeout(7000),
        retryWhen(errors => errors.pipe(delay(1000), take(3))),
        catchError(this.handleError)
      )
    ).then(response => {
      if (response.status === 200 && response.body) {
        if (BasSoapFault.IsBasError(response.body)) {
          BasSoapFault.ThrowError(response.body);
        }
      }
    });
  }

  /**
   * Gère les erreurs HTTP et SOAP de manière centralisée.
   */
  private handleError(error: any) {
    if (error instanceof HttpErrorResponse) {
      console.error('HTTP Error:', error.message);
    } else {
      console.error('Unknown Error:', error);
    }
    return throwError(() => new Error('Erreur réseau ou serveur SOAP inattendue.'));
  }
}
