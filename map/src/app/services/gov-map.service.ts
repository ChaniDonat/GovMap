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
  bubbleContent = `<div style="direction: rtl; font-family: Arial, sans-serif; padding: 10px;">
  <p><strong>יישוב:</strong> {0}</p>
  <p><strong>חלק נמכר:</strong> {1}/{2}</p>
  <p><strong>שווי מכירה:</strong> {3} ₪</p>
  <p><strong>יום מכירה:</strong> {4}</p>
</div>`
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
      layers: ["cell_active", "bus_stops", "SUB_GUSH_ALL", "PARCEL_ALL", "parcel_all"],
      showXY: true,
      identifyOnClick: true,
      layersMode: 4,
      onLoad: (e: any) => this.loadMap(),
    };
    this.govMap?.createMap(divId, options)
  }
  loadMap() {
    this.mapReadySubject.next(true);
  }
  setVisibleLayers(showGush: boolean) {
    if (this.govMap) {
      if (showGush) {
        this.govMap.setVisibleLayers(["SUB_GUSH_ALL", "PARCEL_ALL"], []);
      }
      else {
        this.govMap.setVisibleLayers([], ["SUB_GUSH_ALL", "PARCEL_ALL"]);
      }
    }
  }
  zoom(corX: number, corY: number, zoomLevel: number) {
    this.govMap?.zoomToXY({ x: corX, y: corY, level: zoomLevel, marker: false });
  }
  formatNumber = (value: number) => {
    return new Intl.NumberFormat('he-IL').format(value);
  };
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\./g, '/');
  }

  //הצגת בועת מיקום במפה
  showBubble(CorX: number, CorY: number, row: any) {
    return new Promise(resolve => {
      if (!this.govMap) {
        console.error('GovMap is not initialized');
        return;
      }
      this.govMap.displayGeometries({
        wkts: [`POINT(${CorX} ${CorY})`],
        names: ['bubble'],
        geometryType: this.govMap.geometryType.POINT,
        defaultSymbol: {
          url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCiAgICA8cGF0aA0KICAgICAgICBkPSJNOCAxNkM4IDE2IDE0IDEwLjMxMzcgMTQgNkMxNCAyLjY4NjI5IDExLjMxMzcgMCA4IDBDNC42ODYyOSAwIDIgMi42ODYyOSAyIDZDMiAxMC4zMTM3IDggMTYgOCAxNlpNOCA5QzYuMzQzMTUgOSA1IDcuNjU2ODUgNSA2QzUgNC4zNDMxNSA2LjM0MzE1IDMgOCAzQzkuNjU2ODUgMyAxMSA0LjM0MzE1IDExIDZDMTEgNy42NTY4NSA5LjY1Njg1IDkgOCA5WiINCiAgICAgICAgZmlsbD0iI0Q5MzMxRCIgLz4NCjwvc3ZnPg==',
          width: 30,
          height: 34
        },
        clearExisting: true,
        data: {
          headers: [`פרטי עסקה`],

          bubbleHTML: this.bubbleContent,
          bubbleHTMLParameters: [[row.ShmYeshuv, row.ShmMone, row.ShmMechane, this.formatNumber(row.ShmShoviIska), this.formatDate(row.ShmYomMechira)]]
        }
      });
      resolve(true);
    });
  }
  //הצגת המיקומים של כל העסקאות בנקודה כחולה
  async showPoints(data: any) {
    console.log("showPoints", data);
    if (!this.govMap) {
      console.error('GovMap is not initialized');
      return;
    }
    const bubbleHTMLParameters = data.map((row: any) => {
      return [row.ShmYeshuv, row.ShmMone, row.ShmMechane, this.formatNumber(row.ShmShoviIska), this.formatDate(row.ShmYomMechira)]
    })
    this.govMap.displayGeometries({
        wkts: data.map((p: any) => `POINT(${p.CorX} ${p.CorY})`),
        names: data.map((_: any, i: number) => `point${i}`),
        geometryType: this.govMap.geometryType.POINT,
        defaultSymbol: {
          url: `data:image/svg+xml;charset=utf-8,
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30">
    <circle cx="15" cy="15" r="10" fill="blue"/>
  </svg>`,//,תמונה מקומית
        width: 15,
        height: 15
      },
      clearExisting: false,
      data: {
      headers: data.map(() => `פרטי עסקה`),
      bubbleHTML: this.bubbleContent,
      bubbleHTMLParameters: bubbleHTMLParameters
    }
      });
}

  //מחזיר מיקום של קאורדינטה לפי כתובת
  async getCoordinates(address: string): Promise < { corX: number, corY: number } > {
  var params = {
    keyword: address,
    type: this.govMap!.geocodeType.AccuracyOnly
  };

  return this.govMap!.geocode(params).then((response: any) => {
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
  async fillCorodinate(data: any) {
  for (const row of data) {
    if (row.CorX == null || row.CorY == null) {
      if (row.ShmRehov.length) {
        let point = await this.getCoordinates(`ירושלים ${row.ShmRehov} ${row.ShmMisparBayit}`);
        row.CorX = point.corX;
        row.CorY = point.corY;
      }
    }
  }
}
}

