import { HttpClient } from "@angular/common/http";
import { BasSecurityContext } from "../BasSoapObject/BasSecurityContext";
import { BasSoapClient } from "../Model-BasSoapClient/BasSoapClient";
import { SessionStorage } from "../Model-SessionStorage/SessionStorage";
import { BasAuth } from "./BasAuth";
import { AppConfigService } from "../../Services/AppConfigService/app-config.service";
//import { SecurityContext } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";

export class AuthenticationHelper {

    private basSecurityContext!: BasSecurityContext;
    private basAuth: BasAuth;
  
    constructor(private sessionStorage: SessionStorage, private httpClient: HttpClient, private basSoapClient: BasSoapClient, private appConfigService: AppConfigService) {
      this.basAuth = new BasAuth(this.basSoapClient, this.appConfigService);
    }
  
    //Method for performing basic authentication and fetch token and save in session model
    public async AuthenticateUser(username: string, password: string): Promise<BasSecurityContext> {
     return this.basAuth.OpenSession(username, password).then(
      (res)=>{
        this.basSecurityContext =res
    
      this.sessionStorage.Set(this.sessionStorage.SESSION_ID_TOKEN, this.basSecurityContext.GetSessionId());
      this.sessionStorage.Set(this.sessionStorage.SESSION_AUTHENTICATED, String(this.basSecurityContext.GetIsAuthenticated()));
      this.sessionStorage.SetContext(this.basSecurityContext);
      return this.basSecurityContext
    }
    );
    }

    public New_AuthenticateUser(username: string, password: string, domain?:string): Observable<BasSecurityContext> {
      return this.basAuth.New_OpenSession(username, password, domain).pipe(
       map(res =>{
        console.log("HTTP RESPONSES in BASHELPER:!!!=="+JSON.stringify(res))
         this.basSecurityContext =res
     
       this.sessionStorage.Set(this.sessionStorage.SESSION_ID_TOKEN, this.basSecurityContext.GetSessionId());
       this.sessionStorage.Set(this.sessionStorage.SESSION_AUTHENTICATED, String(this.basSecurityContext.GetIsAuthenticated()));
       this.sessionStorage.SetContext(this.basSecurityContext);
       return this.basSecurityContext
     }
     ),catchError((error: Error) => {
      return throwError(() => error);
    }) );
     }
  
    public async LogOut(): Promise<void>
    {
      let basSecurityContext: BasSecurityContext = this.sessionStorage.GetContext();
      if (basSecurityContext.GetSessionId() != undefined && basSecurityContext.GetSessionId() != null && basSecurityContext.GetSessionId() != "" && basSecurityContext.GetSessionId() != "null") {
        await this.basAuth.CloseSession(basSecurityContext);
      }
      this.sessionStorage.Clear();
    }
  
    //Method For Restoring the token values to session storage service — — -//
    private SetSessionToken(): void {
      let basSecurityContext: BasSecurityContext = this.sessionStorage.GetContext();
      if (basSecurityContext.GetSessionId() != undefined && basSecurityContext.GetSessionId() != null && basSecurityContext.GetSessionId() != "" && basSecurityContext.GetSessionId() != "null") {
        this.sessionStorage.Set(this.sessionStorage.SESSION_ID_TOKEN, this.basSecurityContext.GetSessionId());
        this.sessionStorage.Set(this.sessionStorage.SESSION_AUTHENTICATED, String(this.basSecurityContext.GetIsAuthenticated()));
      } else {
  
        basSecurityContext = this.getSecurityContext;
        this.sessionStorage.Set(this.sessionStorage.SESSION_ID_TOKEN, this.basSecurityContext.GetSessionId());
        this.sessionStorage.Set(this.sessionStorage.SESSION_AUTHENTICATED, String(this.basSecurityContext.GetIsAuthenticated()));
      }
      this.sessionStorage.SetContext(basSecurityContext)
    }
    //Method for getting access token from session model
    public get getSecurityContext(): BasSecurityContext {
      let accessToken;
      accessToken = this.sessionStorage.GetContext();
      return accessToken;
    }

    public  ClearSessions(): void {
      this.sessionStorage.Clear();
    }
  
    public SessionsIsEmpty(): boolean
    {
      return !this.sessionStorage.TokenExists();
    }

    //Method for checking login state from auth guard
    async LoginState(): Promise<boolean> {
      let _basSecurityContext: BasSecurityContext = this.sessionStorage.GetContext();
      if (_basSecurityContext.GetIsAuthenticated())
      {
        try {
          let result = await this.basAuth.CheckSession(_basSecurityContext);
          return result;
        }
        catch (error) {
          this.sessionStorage.Clear();
          return false;
        }
      }
      else
      {
        this.sessionStorage.Clear();
        return false;
      }
    }
  
  }
  