import { Injectable } from '@angular/core';
interface XmlParsedObject {
  [key: string]: string | number | boolean | null | XmlParsedObject | XmlParsedObject[];
}
type Constructor<T> = new (...args: any[]) => T;
@Injectable({ providedIn: 'root' })

export class SoapParserService {

  parseSoapXmlToJson<T = XmlParsedObject | XmlParsedObject[]>(soapXml: string): T {
    const parser = new DOMParser();
    const doc = parser.parseFromString(soapXml, 'application/xml');

    const dataNode = doc.querySelector('Data');
    if (!dataNode || !dataNode.textContent) {
      throw new Error('<Data> introuvable dans la réponse SOAP');
    }

    const decoded = dataNode.textContent
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/\\</g, '<')
      .replace(/\\>/g, '>')
      .replace(/\\\//g, '/')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\')
      .replace(/&gt;/g, '>')
      .replace(/&lt;/g, '<');

    const innerXml = parser.parseFromString(decoded, 'application/xml');
    const root = innerXml.documentElement;

    const isList = root.tagName.toLowerCase().endsWith('s');
    const objectNodes = isList
      ? Array.from(root.getElementsByTagName('object'))
      : [root.querySelector('object')];

    const parsed = objectNodes.map(node => this.xmlNodeToJson(node!));
    const result = isList ? parsed : parsed[0];
   // console.log("RESULTA DE arseSoapXmlToJson......"+JSON.stringify(result))
    return result as T;
  }

  private xmlNodeToJson(node: Element): XmlParsedObject {
    const result: XmlParsedObject = {};
    const children = Array.from(node.children);

    for (const child of children) {
      const tag = child.tagName;
      const name = child.getAttribute('name') ?? tag;
      const isNull = child.getAttribute('is_null') === 'true';

      if (isNull) {
        result[name] = null;
      } else if (tag === 'param') {
        const intVal = child.getAttribute('int_val');
        const floatVal = child.getAttribute('float_val');
        const boolVal = child.getAttribute('bool_val');

        if (intVal) result[name] = parseInt(intVal, 10);
        else if (floatVal) result[name] = parseFloat(floatVal);
        else if (boolVal) result[name] = boolVal === 'true';
        else result[name] = child.textContent ?? '';
      } else if (tag === 'object') {
        const inner = this.xmlNodeToJson(child);
        Object.assign(result, inner);
      } else if (tag === 'array') {
        result[name] = Array.from(child.children).map(c => this.xmlNodeToJson(c));
      }
    }

    return this.cleanZoneWrappedObject(result);
  }

  cleanZoneWrappedObject<T>(input: any): T  {
    console.log("Inside  cleanZoneWrappedObject!!!!!!="+JSON.stringify(input))
    if (input && typeof input === 'object') {
      if ('__zone_symbol__value' in input) {
        return input['__zone_symbol__value'];
      } else {
          return input;
       }
      }else {
        return input;
     }
    }
   

    mapParsedXmlToInterface<T extends object>(
      parsed: XmlParsedObject | XmlParsedObject[],
      ctor: Constructor<T>
    ): T | T[] {
      if (Array.isArray(parsed)) {
        return parsed.map(obj => this.assignToInstance(obj, ctor));
      }
      return this.assignToInstance(parsed, ctor);
    }
    
    assignToInstance<T extends object>(data: XmlParsedObject, ctor: Constructor<T>): T {
      const instance = new ctor();
      for (const key of Object.keys(data)) {
        if (key in instance) {
          (instance as any)[key] = data[key];
        }
      }
      console.log("From assignToInstance!!!!!!=="+JSON.stringify(instance))
      return instance;
    }



} 
