import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, map } from 'rxjs';
import { BasParams } from '../Model/BasSoapObject/BasParams';
import { BasAction } from '../Model/Model-BasAction/BasAction';
import { AuthenticationHelper } from '../Model/Model-BasAuth/BasAuthHelper';
import { BasSoapClient } from '../Model/Model-BasSoapClient/BasSoapClient';
import { Tier, TierTagdMap } from '../Model/tier.model';
import { AppConfigService } from './AppConfigService/app-config.service';
import { isEntityName } from 'typescript';
import { produitTagMap } from '../Model/produit.model';

@Injectable({
  providedIn: 'root'
})
export class DataAccessService {

  private _basAction: BasAction;
  constructor(private http: HttpClient,private basSoapClient: BasSoapClient,  private appConfigService: AppConfigService ) {
   // this.sessionStorage = new SessionStorage();
   // this.isLoading$=of(false)
     this._basAction = new BasAction(this.basSoapClient, this.http, this.appConfigService);
     // this._authenticationHelper = new AuthenticationHelper(this.sessionStorage, this.http, this.basSoapClient, this.appConfigService);
    }

public getall(entity:string){ 
  let actionName: string =this.getActionNameID(entity+'_getall')?.name?? "getall" ;
 const field =this.getActionNameID(entity+'_getall')?.id?? "id"
  let basParams = new BasParams();
  return this._basAction.New_RunAction(actionName, basParams, this.appConfigService.sec()).pipe(map(res=>{
    
    return this.parseSoapResponse(res, entity)

}))

}
public getbyID(entity:string, id:number){ 
  let actionName: string =this.getActionNameID(entity+'_getall')?.name?? "getall" ;
 const field =this.getActionNameID(entity+'_getall')?.id?? "id"
  let basParams = new BasParams();
  basParams.AddInt(field,id)
  return this._basAction.New_RunAction(actionName, basParams, this.appConfigService.sec()).pipe(map(res=>{
    
    return this._basAction.parseToJsonobj(res, entity)

}))

}
public create(entity:string, id:number, data:any){ 
  
  return this.getbyID(entity,id)
}

public update(entity:string, id:number, data:any){ 
  return this.getbyID(entity,id)

}

  getUserProfile(username: string, domain: string) {
    let actionName: string = "Xtlog_Get-profile";
    console.log("Debut fonction Xtlog_Get-profile() .....:")
    let basParams = new BasParams();
    basParams.AddStr('login', username);
    basParams.AddStr('domain', domain);
    return this._basAction.New_RunAction(actionName, basParams, this.appConfigService.sec()).pipe(map(res=>{
    
        return this._basAction.parseToJsonobj(res, "User")
    
    }))
  }

  public getActionNameID(entity:string){
    switch(entity){
       case "tiergetall": return {name:"tiergetall", id:"numtier" };
       case "tierget": return {name:"tiergetall", id:"numtier" };
       case "tiercreate": return {name:"tiergetall", id:"numtier" };
       case "tierupdate": return {name:"tiergetall", id:"numtier" };
       case "projectgetall": return {name:"tiergetall", id:"numtier" };
       case "projectget": return {name:"tiergetall", id:"numtier" };
       case "projectcreate": return {name:"tiergetall", id:"numtier" };
       case "projectupdate": return {name:"tiergetall", id:"numtier" };
       case "contratgetall": return {name:"tiergetall", id:"numtier" };
       case "contratget": return {name:"tiergetall", id:"numtier" };
       case "contratcreate": return {name:"tiergetall", id:"numtier" };
       case "contratupdate": return {name:"tiergetall", id:"numtier" };
       case "piecegetall": return {name:"tiergetall", id:"numtier" };
       case "pieceget": return {name:"tiergetall", id:"numtier" };
       case "piececreate": return {name:"tiergetall", id:"numtier" };
       case "pieceupdate": return{name:"tiergetall", id:"numtier" };
       case "quitgetall": return {name:"tiergetall", id:"numtier" };
       case "quitget": return {name:"tiergetall", id:"numtier" };
       case "quitcreate": return {name:"tiergetall", id:"numtier" };
       case "quitupdate": return {name:"tiergetall", id:"numtier" };
      
     }
     }

     
     private parseSoapResponse<T>(xmlString: string, entity:string) {
      const data: any[] = [];
    
      const cleaned = xmlString
        .replace(/\\</g, '<')
        .replace(/\\>/g, '>')
        .replace(/\\\//g, '/')
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, '\\')
        .replace(/&gt;/g, '>')
        .replace(/&lt;/g, '<');
    
      const match = cleaned.match(`/<`+entity+`s[^>]*>[\s\S]*?<\/`+entity+`s>/`);
      if (!match) return data;
    
      const wrappedXml = match[0];
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(wrappedXml, 'text/xml');
      const prodElements = xmlDoc.getElementsByTagName(entity);
    
      for (let i = 0; i < prodElements.length; i++) {
          const defaults: Partial<any> = {
              taxatt: 0,
              tauxano: 0,
            };
            
            const obj = this.autoMapXmlToObject<any>(prodElements[i], this.getTagMap(entity), defaults);
            
        //const produit = this.mapXmlToObject<Produit>(prodElements[i], produitFieldMap);
        data.push(obj);
      }
    
      return data;
    }
     
    private getTagMap(entity:string){ 
      let tagmap:any
      switch(entity) {
        case "prod": return produitTagMap ;
        case "tier": return TierTagdMap;
        default:
          return{};
      }
      return tagmap

    }
  

     private autoMapXmlToObject<T>(
      element: Element,
      tagMap?: Record<keyof T, string>,
      defaults?: Partial<T>
    ): T {
     
     // const def:Partial<typeoftagmap>
     defaults={}
      const obj = { ...(defaults ?? {}) } as T;
    
      for (const key in tagMap) {
        const tagName = tagMap[key];
        const el = element.getElementsByTagName(tagName)?.[0];
        const text = el?.textContent?.trim();
    
        if (text == null) {
          (obj as any)[key] = undefined;
          continue;
        }
    
        // 🔍 auto-detection du type cible selon la valeur par défaut ou sa présence
        const exampleValue = (defaults?.[key] ?? obj[key]) as any;
    
        if (typeof exampleValue === 'number') {
          (obj as any)[key] = parseFloat(text);
        } else if (typeof exampleValue === 'boolean') {
          (obj as any)[key] = text === 'true' || text === '1';
        } else if (exampleValue instanceof Date) {
          (obj as any)[key] = new Date(text);
        } else {
          (obj as any)[key] = text;
        }
      }
    
      return obj;
    }
}
