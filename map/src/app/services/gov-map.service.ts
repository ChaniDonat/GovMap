import { Injectable } from '@angular/core';
import { GovMapObject } from '../models/gov-map-object.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GovMapService {
  govMap?: GovMapObject
  private mapReadySubject = new BehaviorSubject<boolean>(false); // Tracks if the map is ready
  mapReady$ = this.mapReadySubject.asObservable(); // Observable to listen for readiness

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

  async createMapIframe(divId: string) {
    const options = {
      token: '2596da32-3178-4a04-b596-aaaf9a9df2df',
      visibleLayers: ["cell_active", "bus_stops", "SUB_GUSH_ALL", "PARCEL_ALL"],
      layers: ["cell_active", "bus_stops", "SUB_GUSH_ALL", "PARCEL_ALL", "parcel_all"],
      showXY: true,
      identifyOnClick: true,
      onLoad: (e: any) => this.loadMap(),
    };
    this.govMap?.createMap(divId, options)
  }
  loadMap() {
    this.mapReadySubject.next(true);
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


