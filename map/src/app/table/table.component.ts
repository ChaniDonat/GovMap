import { Component, Output } from '@angular/core';
import { EventEmitter } from 'stream';
import { GovMapService } from '../services/gov-map.service';
import { CommonModule } from '@angular/common';
import { log } from 'console';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  data = {
    Yeshuv: 3000,
    Street: null,
    Home: null,
    PropertyTypeList: null,
    FromDateIska: null,
    ToDateIska: null,
    MahutIskaList: null,
    OldMahutIskaList: null,
    FromShoviMeshuarach: null,
    ToShoviMeshuarach: null,
    RoomsList: null,
    FromYear: null,
    ToYear: null,
    FromArea: null,
    ToArea: null,
    outArrData: [
      {
        Isn: 2153933.0,
        ShmGushHelkaTat: "31267-23-5",
        ShmYeshuv: "3000",
        ShmYomMechira: 20241029,
        ShmShoviIska: 1231229.0,
        shmShoviMuzhar: 1231229.0,
        ShmChalakim: 1.0,
        ShmShnatBnia: 2024,
        ShmShetch: 84,
        ShmSugNeches: 1,
        ShmMahutIska: 101,
        ShmSwCarmen: 1,
        ShmMone: 1,
        ShmMechane: 1,
        ShmSugHishuv: 50,
        ShmSugHishuvFlag: null,
        CorX: 219730.0,
        CorY: 635514.0,
        ShmRehov: "ירושלים - ללא רחוב",
        ShmMisparBayit: "12"
      },
      {
        Isn: 3568121.0,
        ShmGushHelkaTat: "30043-14-51",
        ShmYeshuv: "3000",
        ShmYomMechira: 20241014,
        ShmShoviIska: 361111.0,
        shmShoviMuzhar: 361111.0,
        ShmChalakim: 0.1111111,
        ShmShnatBnia: 1960,
        ShmShetch: 88,
        ShmSugNeches: 1,
        ShmMahutIska: 101,
        ShmSwCarmen: 1,
        ShmMone: 2,
        ShmMechane: 18,
        ShmSugHishuv: 495,
        ShmSugHishuvFlag: null,
        CorX: null,
        CorY: null,
        ShmRehov: "טרומפלדור",
        ShmMisparBayit: "1"
      },
      {
        Isn: 3430702.0,
        ShmGushHelkaTat: "30616-214-0",
        ShmYeshuv: "3000",
        ShmYomMechira: 20241009,
        ShmShoviIska: 427272.72,
        shmShoviMuzhar: 427272.0,
        ShmChalakim: 0.0909090,
        ShmShnatBnia: 0,
        ShmShetch: 0,
        ShmSugNeches: 1,
        ShmMahutIska: 0,
        ShmSwCarmen: 0,
        ShmMone: 1,
        ShmMechane: 11,
        ShmSugHishuv: 495,
        ShmSugHishuvFlag: null,
        CorX: 219832.0,
        CorY: 635857.0,
        ShmRehov: "",
        ShmMisparBayit: ""
      },
      {
        Isn: 3278762.0,
        ShmGushHelkaTat: "30013-71-1",
        ShmYeshuv: "3000",
        ShmYomMechira: 20241001,
        ShmShoviIska: 834667.0,
        shmShoviMuzhar: 834667.0,
        ShmChalakim: 0.1666666,
        ShmShnatBnia: 0,
        ShmShetch: 0,
        ShmSugNeches: 1,
        ShmMahutIska: 101,
        ShmSwCarmen: 0,
        ShmMone: 1,
        ShmMechane: 6,
        ShmSugHishuv: 495,
        ShmSugHishuvFlag: null,
        CorX: 221049.0,
        CorY: 629352.0,
        ShmRehov: "",
        ShmMisparBayit: ""
      },
      {
        Isn: 3082565.0,
        ShmGushHelkaTat: "30013-29-2",
        ShmYeshuv: "3000",
        ShmYomMechira: 20240924,
        ShmShoviIska: 730000.0,
        shmShoviMuzhar: 730000.0,
        ShmChalakim: 0.2000000,
        ShmShnatBnia: 0,
        ShmShetch: 0,
        ShmSugNeches: 1,
        ShmMahutIska: 101,
        ShmSwCarmen: 0,
        ShmMone: 1,
        ShmMechane: 5,
        ShmSugHishuv: 495,
        ShmSugHishuvFlag: null,
        CorX: 221157.0,
        CorY: 629637.0,
        ShmRehov: "",
        ShmMisparBayit: ""
      },
      {
        Isn: 3620035.0,
        ShmGushHelkaTat: "30408-121-2",
        ShmYeshuv: "3000",
        ShmYomMechira: 20240822,
        ShmShoviIska: 5008000.0,
        shmShoviMuzhar: 5008000.0,
        ShmChalakim: 0.9700000,
        ShmShnatBnia: 0,
        ShmShetch: 0,
        ShmSugNeches: 1,
        ShmMahutIska: 105,
        ShmSwCarmen: 0,
        ShmMone: 97,
        ShmMechane: 100,
        ShmSugHishuv: 492,
        ShmSugHishuvFlag: null,
        CorX: 216721.0,
        CorY: 630524.0,
        ShmRehov: "מרטון יחזקאל",
        ShmMisparBayit: "3"
      },
    ],
  };

  constructor(private govMapService: GovMapService) { }

  ngOnInit(): void {
    this.govMapService.mapReady$.subscribe(async (isReady) => {
      if (isReady) {
        this.govMapService.showPoints(this.data.outArrData)
        let point = this.govMapService.getCoordinates(this.data.Yeshuv.toString());
        this.govMapService.zoom((await point).corX, (await point).corY, 8);
      }
    });
  }

  async onMouseEnter(row: any) {
    debugger
    if (row.CorX == null || row.CorY == null) {
      //מה לעשות במקרה ואין לי שם רחוב????
      if (row.ShmRehov.length) {
        let point = this.govMapService.getCoordinates(`ירושלים ${row.ShmRehov} ${row.ShmMisparBayit}`)
        row.corX = (await point).corX;
        row.corX = (await point).corY;
       this.govMapService.showBubble((await point).corX, (await point).corY,row);
      }
    }
    else {
      // הצגת בועה על המפה
      this.govMapService.showBubble(row.CorX, row.CorY,row);
      let filterData = this.data.outArrData.filter((d: any) => d != row)
      // הצגת המיקומים של כל העסקאות על המפה
      this.govMapService.showPoints(filterData)
    }
  }
}
