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
  tableData = [
    { name: ' שאדיקר נחום', x: 219730, y: 635514, col4: 'Data 1', col5: 'Data 2', col6: 'Data 3', col7: 'Data 4', col8: 'Data 5' },
    { name: 'ירושלים', x: 219832, y: 635857, col4: 'Data 6', col5: 'Data 7', col6: 'Data 8', col7: 'Data 9', col8: 'Data 10' },
    { name: 'חיפה', x: 221330, y: 633930, col4: 'Data 11', col5: 'Data 12', col6: 'Data 13', col7: 'Data 14', col8: 'Data 15' },
    { name: 'ירושלים', x: 221157, y: 629637, col4: 'Data 6', col5: 'Data 7', col6: 'Data 8', col7: 'Data 9', col8: 'Data 10' },
    { name: 'ירושלים', x: 221393, y: 633431, col4: 'Data 6', col5: 'Data 7', col6: 'Data 8', col7: 'Data 9', col8: 'Data 10' },
    { name: 'ירושלים', x: 220201, y: 630588, col4: 'Data 6', col5: 'Data 7', col6: 'Data 8', col7: 'Data 9', col8: 'Data 10' },
    { name: 'תל אביב', x: 216721, y: 630524, col4: 'Data 6', col5: 'Data 7', col6: 'Data 8', col7: 'Data 9', col8: 'Data 10' },
    { name: 'ירושלים', x: 219766, y: 635698, col4: 'Data 6', col5: 'Data 7', col6: 'Data 8', col7: 'Data 9', col8: 'Data 10' },

  ];

  constructor(private govMapService: GovMapService) { }

  ngOnInit(): void {
    this.govMapService.mapReady$.subscribe(async (isReady) => {
      if (isReady) {
        // this.govMapService.zoom(this.tableData[0].x, this.tableData[0].y, 8);
        this.govMapService.showPoints(this.tableData)
        // this.govMapService.zoom(220218, 631937, 8);
        // 220218.58,631937.52
        let point=this.govMapService.getCoordinates(" שאדיקר נחום ירושלים");
        this.govMapService.zoom((await point).corX, (await point).corY,8);
      }
    });
  }

  onMouseEnter(row: any) {
    // שולח את הערכים למפה כאשר העכבר עובר על שורה
    this.govMapService.showCustomBubble(row.x, row.y);
    let filterData = this.tableData.filter((d: any) => d != row)
    this.govMapService.showPoints(filterData)
    // this.govMapService.zoom(row.x, row.y, 8);


  }
}
