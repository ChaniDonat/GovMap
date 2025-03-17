import { Injectable } from '@angular/core';
import { GovMapObject } from '../models/gov-map-object.model';

@Injectable({
  providedIn: 'root'
})
export class GovMapService {
  govMap?: GovMapObject
  points: any[] = [];
  gushTemp: string[] = [];
  helkaTemp: string[] = [];

  constructor() { }

  async loadScript(scriptUrl: string) {
    let promise: any = new Promise<any>((resolve, reject) => {
      let script = window.document.createElement('script') as HTMLScriptElement;
      script.src = scriptUrl;
      script.type = 'text/javascript';

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
    ];

    await this.loadScript(scripts[0]);
    await this.loadScript(scripts[1]);

    let wnd: any = window;
    this.govMap = wnd['govmap'];

  }

  createMapIframe(divId: string, options: any, corX: number, corY: number) {
    this.govMap?.createMap(divId, options);
    this.zoom(corX, corY, 8);
  }

  zoom(corX: number, corY: number, zoomLevel: number) {
    this.govMap?.zoomToXY({ x: corX, y: corY, level: zoomLevel, marker: false });
  }
  showCustomBubble(corX: number, corY: number) {
    if (!this.govMap) {
      console.error('GovMap is not initialized');
      return;
    }

    this.govMap.displayGeometries({
      wkts: [`POINT(${corX} ${corY})`],
      names: ['point1'],
      geometryType: this.govMap.drawType.Point,
      defaultSymbol: {
        url: 'http://localhost:4200/assets/images/bubble2.svg',//,תמונה מקומית

        width: 75,
        height: 48
      },
      clearExisting: false,
      data: {} 
    });
    this.zoom(corX, corY, 8); // זום להתמקדות בנקודה
  }
}


