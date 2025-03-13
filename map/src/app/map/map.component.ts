import { Component } from '@angular/core';
import { GovMapService } from '../services/gov-map.service';

declare var GovMap: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone:true

})
export class MapComponent {
  constructor(private svc: GovMapService) {
    debugger
  }

  async ngOnInit() {

    await this.svc.init();
    const options = {
      token: '2596da32-3178-4a04-b596-aaaf9a9df2df',
      visibleLayers: ["cell_active", "bus_stops", "SUB_GUSH_ALL", "PARCEL_ALL"],
      layers: ["cell_active", "bus_stops", "SUB_GUSH_ALL", "PARCEL_ALL", "parcel_all"],
      showXY: true,
      identifyOnClick: true
    };
    debugger
    const map = this.svc.createMapIframe('map',options,223768,638938);// new GovMap.createMap('map', options);
  }
}