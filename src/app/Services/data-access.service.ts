import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, map } from 'rxjs';
import { BasParams } from '../Model/BasSoapObject/BasParams';
import { BasAction } from '../Model/Model-BasAction/BasAction';
//import { AuthenticationHelper } from '../Model/Model-BasAuth/BasAuthHelper';
import { BasSoapClient } from '../Model/Model-BasSoapClient/BasSoapClient';
import { Tier, TierTagdMap } from '../Model/tier.model';
import { AppConfigService } from './AppConfigService/app-config.service';
//import { isEntityName } from 'typescript';
import { produitTagMap } from '../Model/produit.model';
import { SessionStorage } from '../Model/Model-SessionStorage/SessionStorage';
import { xtlogTagMap,Xtlog } from '../Model/xtlog.model';

@Injectable({
  providedIn: 'root'
})
export class DataAccessService {
  private sessionStorage: SessionStorage;
  private _basAction: BasAction;
  constructor(private http: HttpClient,private basSoapClient: BasSoapClient,  private appConfigService: AppConfigService ) {
    this.sessionStorage = new SessionStorage();
   // this.isLoading$=of(false)
     this._basAction = new BasAction(this.basSoapClient, this.http, this.appConfigService);
     // this._authenticationHelper = new AuthenticationHelper(this.sessionStorage, this.http, this.basSoapClient, this.appConfigService);
    }

public getall(entity:string){ 
  let actionName: string =this.getActionNameID(entity+'_getall')?.name?? "getall" ;
 const field =this.getActionNameID(entity+'_getall')?.id?? "id"
  let basParams = new BasParams();
  return this._basAction.New_RunAction(actionName, basParams, this.sessionStorage.GetContext()).pipe(map(res=>{
    
    return this.parseSoapResponse(res, entity)

}))

}
public getbyID(entity:string, id:number){ 
  let actionName: string =this.getActionNameID(entity+'_getall')?.name?? "getall" ;
 const field =this.getActionNameID(entity+'_getall')?.id?? "id"
  let basParams = new BasParams();
  basParams.AddInt(field,id)
  return this._basAction.New_RunAction(actionName, basParams, this.sessionStorage.GetContext()).pipe(map(res=>{
    
    return this._basAction.parseSoapXmlToJson(res)

}))

}
public create(entity:string, id:number, data:any){ 
  
  return this.getbyID(entity,id)
}

public update(entity:string, id:number, data:any){ 
  return this.getbyID(entity,id)

}

  getUserProfile(username: string, domain: string) {
    let actionName: string = "Xtlog_Get";
    console.log("Debut fonction Xtlog_Get-profile() .....:")
    let basParams = new BasParams();
    basParams.AddStr('login', username);
    basParams.AddStr('domain', domain);
    return this._basAction.New_RunAction(actionName, basParams, this.sessionStorage.GetContext()).pipe(map(async res=>{
     
        return this.parseSoapXmlToJson<Xtlog>(res)
    
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

   
   
     private parseSoapXmlToJson<T = Record<string, any>>(soapXml: string): T {
        const parser = new DOMParser();
        const doc = parser.parseFromString(soapXml, 'application/xml');
    
        const dataNode = doc.querySelector('Data');
        console.log('<Data>  dans la réponse SOAP......='+dataNode)
        if (!dataNode) throw new Error('<Data> introuvable dans la réponse SOAP');
    
        const innerXml = new DOMParser().parseFromString(dataNode.textContent || '', 'application/xml');
        const params = innerXml.querySelectorAll('param');
        console.log('<innerXml>  dans la réponse SOAP......='+innerXml)
        console.log('<params>  dans la réponse SOAP......='+params)
        const result: Record<string, any> = {};
    
        params.forEach(param => {
          const name = param.getAttribute('name');
          console.log('<param name>  dans la réponse SOAP......='+name)
   
          if (!name) return;
    
          const type = param.getAttribute('type');
          const intVal = param.getAttribute('int_val');
          const isNull = param.getAttribute('is_null');
    
          if (isNull === 'true') {
            result[name] = null;
          } else if (type === 'ptInt' && intVal !== null) {
            result[name] = parseInt(intVal, 10);
          } else {
            result[name] = param.textContent ?? '';
          }
        });
    
        return result as T;
      }
    
    
  


   /*

    private async  parseSoapXmlToJson(xml: string): Promise<Record<string, any>> {
      try {
        const result = await parseStringPromise(xml, { explicitArray: false });
    
        // 1. Naviguer jusqu'à SOAP > Body > RunActionResponse > BasActionResult > Data
        const dataEncoded = result['SOAP-ENV:Envelope']?.['SOAP-ENV:Body']?.['NS1:BasActionResult']?.['Data'];
        if (!dataEncoded) throw new Error('Data field not found in SOAP response.');
        console.log("ENCODED DATA .......!="+dataEncoded)
        // 2. Décoder le XML string en texte lisible
        const dataXml = this.decodeHtmlEntities(dataEncoded);
        console.log("DECODED DATA  XML string en texte lisible .......!="+dataXml)
        // 3. Parser le XML contenu dans <Data>
        const parsedData = await parseStringPromise(dataXml, { explicitArray: false });
    
        // 4. Mapper <param> en objet clé-valeur
        const params = parsedData.xtlog?.object?.param;
        const objectResult: Record<string, any> = {};
    
        if (Array.isArray(params)) {
          for (const param of params) {
            const key = param.$.name;
            objectResult[key] = param._ || param.$?.int_val || null;
          }
        } else if (params) {
          const key = params.$.name;
          objectResult[key] = params._ || params.$?.int_val || null;
        }
        console.log("OBJET EN JSON CONSTITUER .......!="+JSON.stringify(objectResult))
   
        return objectResult;
      } catch (err) {
        console.error('Failed to parse SOAP response:', err);
        throw err;
      }
    }
    

   private decodeHtmlEntities(encoded: string): string {
      const textarea = document.createElement('textarea');
      textarea.innerHTML = encoded;
      return textarea.value;
    }
    */
     
    private getTagMap(entity:string){ 
      let tagmap:any
      switch(entity) {
        case "prod": return produitTagMap ;
        case "tier": return TierTagdMap;
        case "xtlog": return xtlogTagMap;
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
