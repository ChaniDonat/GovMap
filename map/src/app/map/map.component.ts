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
    
  }

  async ngOnInit() {

    await this.svc.init();
    const options = {
      token: '5a4b8472-b95b-4687-8179-0ccb621c7990',//לצורך בדיקות
      // '2596da32-3178-4a04-b596-aaaf9a9df2df',
      visibleLayers: ["cell_active", "bus_stops", "SUB_GUSH_ALL", "PARCEL_ALL"],
      layers: ["cell_active", "bus_stops", "SUB_GUSH_ALL", "PARCEL_ALL", "parcel_all"],
      showXY: true,
      identifyOnClick: true,
    };
    const map = this.svc.createMapIframe('map');// new GovMap.createMap('map', options);
  }
}