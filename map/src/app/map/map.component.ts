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
    const map = this.svc.createMapIframe('map');
  }
}