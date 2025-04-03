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
        geometryType: this.govMap.drawType.Point,
        defaultSymbol: {
          url: 'http://localhost:4200/assets/images/geo-alt-fill.svg',//,תמונה מקומית
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
      geometryType: this.govMap.drawType.Point,
      defaultSymbol: {
        url: 'http://localhost:4200/assets/images/circle-blue.svg',//,תמונה מקומית
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
  async getCoordinates(address: string): Promise<{ corX: number, corY: number }> {
    var params = {
      keyword: address,
      type: "AccuracyOnly"
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

