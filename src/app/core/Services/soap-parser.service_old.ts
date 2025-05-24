import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SoapParserService {
  parseSoapXmlToJson<T = Record<string, any>>(soapXml: string): T {
    const parser = new DOMParser();
    const doc = parser.parseFromString(soapXml, 'application/xml');

    const dataNode = doc.querySelector('Data');
    if (!dataNode || !dataNode.textContent) {
      throw new Error('<Data> introuvable dans la réponse SOAP');
    }

    const innerXml = new DOMParser().parseFromString(dataNode.textContent, 'application/xml');
    const root = innerXml.documentElement;

    return this.xmlNodeToJson(root) as T;
  }

  private xmlNodeToJson(node: Element): any {
    const obj: Record<string, any> = {};
    const children = Array.from(node.children);

    if (children.length === 0) {
      return node.textContent;
    }

    for (const child of children) {
      const tag = child.tagName;
      const name = child.getAttribute('name');
      const isNull = child.getAttribute('is_null') === 'true';

      if (isNull) {
        obj[name || tag] = null;
      } else if (child.tagName === 'param') {
        const intVal = child.getAttribute('int_val');
        const floatVal = child.getAttribute('float_val');
        const boolVal = child.getAttribute('bool_val');
        const type = child.getAttribute('type');

        if (intVal) obj[name || tag] = parseInt(intVal, 10);
        else if (floatVal) obj[name || tag] = parseFloat(floatVal);
        else if (boolVal) obj[name || tag] = boolVal === 'true';
        else obj[name || tag] = child.textContent ?? '';
      } else if (child.tagName === 'object') {
        const typename = child.getAttribute('typename') || tag;
        obj[typename] = this.xmlNodeToJson(child);
      } else if (child.tagName === 'array') {
        const items = Array.from(child.children).map(el => this.xmlNodeToJson(el));
        obj[name || tag] = items;
      } else {
        obj[name || tag] = this.xmlNodeToJson(child);
      }
    }

    return obj;
  }
}
