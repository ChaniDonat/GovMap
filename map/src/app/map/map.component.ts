import { Component } from '@angular/core';
import { GovMapService } from '../services/gov-map.service';
import { FormsModule, NgModel } from '@angular/forms';

declare var GovMap: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
  imports: [FormsModule]
})
export class MapComponent {
  showGushOnMap: boolean = false
  constructor(private svc: GovMapService) {

  }

  async ngOnInit() {

    await this.svc.init();
    const map = this.svc.createMapIframe('map');
  }
  onSwitch() {
    this.svc.setVisibleLayers(this.showGushOnMap)
  }
}