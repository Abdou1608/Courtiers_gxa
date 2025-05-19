import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { Produit, produitFieldMap, produitTagMap } from '../Model/produit.model';
import { BasParams } from '../Model/BasSoapObject/BasParams';
import { BasAction } from '../Model/Model-BasAction/BasAction';
import { AuthenticationHelper } from '../Model/Model-BasAuth/BasAuthHelper';
import { SessionStorage } from '../Model/Model-SessionStorage/SessionStorage';
import { BasSoapClient } from '../Model/Model-BasSoapClient/BasSoapClient';
import { AppConfigService } from './AppConfigService/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private apiUrl = '/api/produits'; // 🔁 adapte selon ton endpoint backend
  private _authenticationHelper: AuthenticationHelper;
  private sessionStorage: SessionStorage;
  private _basAction: BasAction;
  constructor(private http: HttpClient, private basSoapClient: BasSoapClient, private httpClient: HttpClient, private appConfigService: AppConfigService) {
    this.sessionStorage = new SessionStorage();
      this._basAction = new BasAction(this.basSoapClient, this.httpClient, this.appConfigService);
      this._authenticationHelper = new AuthenticationHelper(this.sessionStorage, this.httpClient, this.basSoapClient, this.appConfigService);
  
  }

  async getAll(): Promise<Observable<Produit[]> | undefined>
    {
        let username: string = "superviseur";
        let password: string = "21032024";
    
         // let actionName: string = "Bran_ListItems";
       // let actionName: string = "Sys_Echo";
      let actionName: string = "Produit_ListItems";
         console.log("Debut fonction getAll() .....:")
       // try {
            // open
           // await this._authenticationHelper.AuthenticateUser(username, password)
           // then(async (res)=>{
                console.log("Resulta connection.....:"+this._authenticationHelper.getSecurityContext.SessionId)
                let basParams = new BasParams();
                basParams.AddStr('message', "Test From Angular");
              
            basParams.AddBool('disponible', true);
          let testresult= await (this._basAction.RunAction(actionName, basParams, this._authenticationHelper.getSecurityContext))
          .catch(e=>
            console.log("Resulta de RunAction dans Catch.....:"+ e +"===============================================================================================================================")
          )
           //.then((testresult) =>{
          
           
           if(testresult){
            console.log("Resulta de RunAction.....:"+testresult)
            console.log(":===============================================================================================================================")
        //   console.log("this.parseProduitsFromXml(testresult).... "+this.parseProduitsFromXml(testresult))
           console.log(":===============================================================================================================================")
           console.log("this.parseSoapResponse(testresult).... "+this.parseSoapResponse(testresult))
           console.log(":===============================================================================================================================")

           let produits:Produit[]= this.parseSoapResponse(testresult)
            //  this.parseSoapResponse(testresult) 
            console.log("Resulta Produit_ListItems.....:"+JSON.stringify(produits.forEach(p=>p.codeprod))) ;
           // let produits:Produit[] =[]
          //  produitss.
           // JSON.parse(produitss) 
            return of(produits )
        }
        else{
            throwError(new Error(`Erreur de reccuperation des donnees sur Produit_ListItems`))
            console.log("ERREUR Resulta Produit_ListItems.....Pas de donn2es recus:");
         
            return 
       // } })
    }  
            // disconnect
          //  this._authenticationHelper.LogOut();})  }
      //  catch(error: any){ console.error("ERREUR Resulta Produit_ListItems.....dans Catch....."+ error)
       //    return }
    //return this.http.get<Produit[]>(this.apiUrl);
  }

  getById(codeprod: string): Observable<Produit> {
    return this.http.get<Produit>(`${this.apiUrl}/${codeprod}`);
  }

  create(produit: Produit): Observable<Produit> {
    return this.http.post<Produit>(this.apiUrl, produit);
  }

  update(codeprod: string, produit: Produit): Observable<Produit> {
    return this.http.put<Produit>(`${this.apiUrl}/${codeprod}`, produit);
  }

  delete(codeprod: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${codeprod}`);
  }

  public parseSoapResponse(xmlString: string): Produit[] {
    const produits: Produit[] = [];
  
    const cleaned = xmlString
      .replace(/\\</g, '<')
      .replace(/\\>/g, '>')
      .replace(/\\\//g, '/')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\')
      .replace(/&gt;/g, '>')
      .replace(/&lt;/g, '<');
  
    const match = cleaned.match(/<prods[^>]*>[\s\S]*?<\/prods>/);
    if (!match) return produits;
  
    const wrappedXml = match[0];
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(wrappedXml, 'text/xml');
    const prodElements = xmlDoc.getElementsByTagName('prod');
  
    for (let i = 0; i < prodElements.length; i++) {
        const defaults: Partial<Produit> = {
            taxatt: 0,
            tauxano: 0,
          };
          
          const produit = this.autoMapXmlToObject<Produit>(prodElements[i], produitTagMap, defaults);
          
      //const produit = this.mapXmlToObject<Produit>(prodElements[i], produitFieldMap);
      produits.push(produit);
    }
  
    return produits;
  }

 /**
  public  parseSoapResponse(xmlString: string): Produit[] {
    const produits: Produit[] = [];
    console.log(":===============================================================================================================================")
    console.log(":===============================================================================================================================")
    console.log(":===============================================================================================================================")

    //console.log('xmlString dans parseSoapResponse=.....'+ xmlString)
    const _xmlContent = xmlString
    .replace(/\\</g, '<')
    .replace(/\\>/g, '>')
    .replace(/\\\//g, '/')
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\')
    .replace('&gt;', '>')
    .replace('&lt;', '<')
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<');
         
    const rawContentMatch = _xmlContent.match(/<prods[^>]*>([\s\S]*?)<\/prods>/);
    if (!rawContentMatch) return produits;
  const xmlContent = rawContentMatch[0]
    

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlContent, 'text/xml');
 
    const prodElements = xmlDoc.getElementsByTagName('prod');

console.log(":===============================================================================================================================")
 
console.log('£££££prodElements.length  =.....'+prodElements.length)
    for (let i = 0; i < prodElements.length; i++) {
      const prod = prodElements[i];

      const getTagValue = (tagName: string): any => {
        const el = prod.getElementsByTagName(tagName)[0];
        return el?.textContent?.trim() ?? '';
      };


      const produit: Produit = {
        codeprod: getTagValue('b_codeprod'),
        branche: getTagValue('b_branche'),
        branc: getTagValue('b_branc'),
        libelle: getTagValue('b_libelle'),
        cieprin: getTagValue('b_cieprin'),
        pronopol: getTagValue('b_pronopol'),
        pronoave: getTagValue('b_pronoave'),
        groupe: getTagValue('b_groupe'),
        tartype: getTagValue('b_tartype'),
        tardev: getTagValue('b_tardev'),
        tarcle: getTagValue('b_tarcle'),
        tararro: getTagValue('b_tararro'),
        tauxatt: getTagValue('b_tauxatt'),
        nondispo: getTagValue('b_nondispo'),
        majcrm: getTagValue('b_majcrm'),
        catalog: getTagValue('b_catalog'),
        ole: getTagValue('b_ole'),
        typarro: getTagValue('b_typarro'),
        fvahom: getTagValue('b_fvahom'),
      };
console.log('Produit extrait et reconstituee  =.....'+produit.codeprod)
      produits.push(produit);
    }

    return produits;
  }


 * Transforme un élément XML en objet JS basé sur une map {champObject: nomTagXml}

private mapXmlToObject<T>(element: Element, fieldMap: Record<keyof T, string>): T {
    const obj = {} as T;
  
    for (const key in fieldMap) {
      const tag = fieldMap[key];
      const el = element.getElementsByTagName(tag)[0];
      const value = el?.textContent?.trim() ?? undefined;
  
      (obj as any)[key] = value;
    }
  
    return obj;
  }
 */
 private toXmlFromObject<T>(
    obj: T,
    tagMap: Record<keyof T, string>,
    rootTag: string = 'prod'
  ): string {
    const escapeXml = (value: any): string =>
      String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
  
    let xml = `<${rootTag}>`;
  
    for (const key in tagMap) {
      const tagName = tagMap[key];
      const value = (obj as any)[key];
  
      if (value !== undefined && value !== null) {
        xml += `<${tagName}>${escapeXml(value)}</${tagName}>`;
      }
    }
  
    xml += `</${rootTag}>`;
    return xml;
  }
  

  private autoMapXmlToObject<T>(
    element: Element,
    tagMap: Record<keyof T, string>,
    defaults?: Partial<T>
  ): T {
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
