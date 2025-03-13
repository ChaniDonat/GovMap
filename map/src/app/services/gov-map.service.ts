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
    debugger
    this.govMap?.createMap(divId, options);
    this.zoom(corX, corY, 8);
    // this.loadPoints()
  }
  // loadPoints() {
  //   let data={
  //     d:[{
  //       _corX: 223768,
  //       _corY:638938,
  //       _gushHelka:"30649-48"
  //     }]
  //   }
  // this.displayPointsOnMap(data.d);
  //  this.showCustomBubble(223768,638938);

  // }

  displayPointsOnMap(data: any[]) {
    let firstTime = true;
    const points: string[] = [];
    const names: string[] = [];
    const symbols: any[] = [];
    const bubblesinfo: string[] = [];
    const baseUrl = window.location.origin + '/mapi/iconb';

    data.forEach((point, index) => {
      if (point._corX > 0 && point._corY > 0) {
        if (firstTime) {
          this.zoom(point._corX, point._corY, 8);
          firstTime = false;
        }

        const [gush, helka] = point._gushHelka.split('-');
        let iconIndex = this.gushTemp.findIndex((g, i) => g === gush && this.helkaTemp[i] === helka);
        if (iconIndex === -1) {
          iconIndex = this.gushTemp.length;
          this.gushTemp.push(gush);
          this.helkaTemp.push(helka);
        }

        points.push(`POINT(${point._corX} ${point._corY})`);
        names.push('p' + iconIndex);
        symbols.push({ url: `${baseUrl}${iconIndex + 1}.png`, width: '20', height: '40' });
        bubblesinfo.push(`?ids=${index}&ProcessKey=someProcessKey`);
      }
    });

    if (points.length > 0) {
      this.govMap?.displayGeometries({
        wkts: points,
        names: names,
        geometryType: this.govMap?.drawType.Point,
        defaultSymbol: { url: 'http://www.creatingonline.com/webmaster/free_bullets/greenbullet1.gif', width: 15, height: 15 },
        symbols: symbols,
        clearExisting: false,
        data: { bubbles: bubblesinfo, bubbleUrl: window.location.origin + '/mapBubble.aspx' }
      });
    }
  }

  zoom(corX: number, corY: number, zoomLevel: number) {
    this.govMap?.zoomToXY({ x: corX, y: corY, level: zoomLevel, marker: false });
    // this.govMap?.zoomToXY({ x: 223768, y: 638938, level: 8, marker: false });

  }
  showCustomBubble(corX: number, corY: number) {
    if (!this.govMap) {
      console.error('GovMap is not initialized');
      return;
    }

    this.govMap.displayGeometries({
      wkts: [`POINT(${corX} ${corY})`],
      names: ['myLocation'],
      geometryType: this.govMap.drawType.Point,
      defaultSymbol: {
        url: 'http://localhost:4200/assets/images/bubble2.svg',//,תמונה מקומית

        width: 75,
        height: 48
      },
      clearExisting: false,
      data: {
        bubbles: [`<img src="http://localhost:4200/assets/images/bubble.svg" width="50" height="50" />`],
        bubbleUrl: '' // ריק כדי שיתעלם ממנו ויתמקד ב-bubbles

        // // bubbles: [`<div style="
        // //   background: white;
        // //   border: 2px solid #5BB7A3;
        // //   border-radius: 8px;
        // //   padding: 8px;
        // //   font-size: 14px;
        // //   font-weight: bold;
        // //   color: #007770;
        // //   box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
        // // "> זה כאן </div>`],
        // bubbleUrl: 'http://localhost:4200/assets/bubble.svg',
        // // // נדרש להיות ריק כדי להשתמש במערך `bubbles`
      }
    });
    this.zoom(corX, corY, 8); // זום להתמקדות בנקודה
  }
}


