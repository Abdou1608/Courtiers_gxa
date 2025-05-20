import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { AuthService } from '../auth/auth.service';
//import { BasSecurityContext } from '../../Model/BasSoapObject/BasSecurityContext';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  [x: string]: any;

  private _baseUrl: string = "ec2-15-188-63-136.eu-west-3.compute.amazonaws.com";
private _sec:any =null

  public set baseUrl(value: string) {
    this._baseUrl = value;
  }


  public get baseUrl(): string {
    return this._baseUrl;
  }

  private _apiEndpoint: string = "/soap/";
  public set apiEndpoint(value: string) {
   // this._apiEndpoint = value;
  }
  public get apiEndpoint(): string {
    return this._apiEndpoint;
  }
  private _port: number = 8080;

  public set port(value: number) {
  //  this._port = value;
  }
  public get port(): number {
    return this._port;
  }

  private actionService: string = "IBasActionService";
  private webAuthService: string = "IBasWebAuthService ";
  private authService: string = "IBasAuthService";
  private b4WService: string = "IBas4WebService";

  constructor(private http: HttpClient,) {
   }

  public load(): Promise<any> {
    let path: string = 'assets/app.config.json';
    return this.http.get(path)
      .toPromise()
      .then(data => {
        Object.assign(this, data);
        return data;
      });
  }

  
  public GetURlAuthService(): string {
    return `${this.apiEndpoint}${this.authService}`;
  //  return `${this.baseUrl}:${this.port}${this.apiEndpoint}${this.authService}`;
  }


  public GetURlActionService(): string {
    return `${this.apiEndpoint}${this.actionService}`;
  }

  public GetBasWebAuthService(): string {
    return `${this.apiEndpoint}${this.webAuthService}`;
  }

 

}
