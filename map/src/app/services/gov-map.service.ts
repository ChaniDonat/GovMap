import { Injectable } from '@angular/core';
import { GovMapObject } from '../models/gov-map-object.model';

@Injectable({
  providedIn: 'root'
})
export class GovMapService {
  govMap?: GovMapObject
  constructor() {

  }

  async loadScript(scriptUrl: string) {
    let promise: any = new Promise<any>((resolve, reject) => {
      let script = window.document.createElement('script') as HTMLScriptElement;
      script.src = scriptUrl;
      script.type = 'text/javascript';
      //script.async = false;
      //script.charset = 'utf-8'

      script.onload = function () {
        resolve({ script })
      }

      window.document.head.append(script);
    })
    return promise
  }

  async init() {
    let scripts = [
      "https://code.jquery.com/jquery-1.12.1.min.js",
      "https://www.govmap.gov.il/govmap/api/govmap.api.js"
      // 'http://localhost/govmap/govmap.api.js'
    ];

    await this.loadScript(scripts[0]);
    await this.loadScript(scripts[1]);

    let wnd: any = window;
    this.govMap = wnd['govmap'];
    // let scriptsloaded = window.document.querySelector(`script[src="${scriptUrl}"]`);
    // if (scriptsloaded == null) {
    //   let script = window.document.createElement('script') as HTMLScriptElement;
    //   script.src = scriptUrl;
    //   script.type = 'text/javascript';
    //   //script.async = false;
    //   //script.charset = 'utf-8'

    //   window.document.head.append(script);

    // }

  }

  createMapIframe(divId: string, options: any) {
    debugger
    this.govMap?.createMap(divId, options);

  }

}