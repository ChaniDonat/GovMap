import { Injectable } from '@angular/core';
import { GovMapObject } from '../models/gov-map-object.model';
import { BehaviorSubject } from 'rxjs';
import { response } from 'express';
import { HttpClient } from '@angular/common/http';

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
      token: '5a4b8472-b95b-4687-8179-0ccb621c7990',
      visibleLayers: [],
      // ["cell_active", "bus_stops", "SUB_GUSH_ALL", "PARCEL_ALL"],
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
        url: 'http://localhost:4200/assets/images/geo-alt-fill.svg',//,תמונה מקומית
        width: 25,
        height: 29
      },
      clearExisting: true,
      data: {}
    });
    this.zoom(corX, corY, 7); // זום להתמקדות בנקודה
  }

  showPoints(data: any) {
    let points = data.map((p: any) => {
      return `POINT(${p.x} ${p.y})`
    })
    debugger
    this.govMap!.displayGeometries({
      wkts: points,
      names: ['points'],
      geometryType: this.govMap?.drawType.Point,
      defaultSymbol: {
        url: 'http://localhost:4200/assets/images/circle-blue.svg',//,תמונה מקומית

        width: 15,
        height: 15
      },
      clearExisting: false,
      data: {}
    });
  }
  getCoordinates(address: string): Promise<{ corX: number, corY: number }> {
    var params = {
      keyword: address,
      type: "AccuracyOnly"
    };

   return  this.govMap!.geocode(params).then((response: any) => {
      console.log("תוצאה:", response);
      if (response.data?.length > 0) {
        return {
          corX: response.data[0].X,
          corY: response.data[0].Y
        }
      }
      else {
        throw new Error("לא נמצאו תוצאות");
      }
    });
  }
}

