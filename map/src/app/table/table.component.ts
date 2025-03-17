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
    { name: ' שאדיקר נחום', x: 223768, y: 638938, col4: 'Data 1', col5: 'Data 2', col6: 'Data 3', col7: 'Data 4', col8: 'Data 5' },
    { name: 'ירושלים', x: 223754, y: 638823, col4: 'Data 6', col5: 'Data 7', col6: 'Data 8', col7: 'Data 9', col8: 'Data 10' },
    { name: 'חיפה', x: 223752, y: 638860, col4: 'Data 11', col5: 'Data 12', col6: 'Data 13', col7: 'Data 14', col8: 'Data 15' },
    { name: 'ירושלים', x: 218080, y: 627112, col4: 'Data 6', col5: 'Data 7', col6: 'Data 8', col7: 'Data 9', col8: 'Data 10' },
    { name: 'ירושלים', x: 223229, y: 637035, col4: 'Data 6', col5: 'Data 7', col6: 'Data 8', col7: 'Data 9', col8: 'Data 10' },
    { name: 'ירושלים', x: 219551, y: 634004, col4: 'Data 6', col5: 'Data 7', col6: 'Data 8', col7: 'Data 9', col8: 'Data 10' },
  ];

  constructor(private govMapService: GovMapService) {}

  ngOnInit(): void {
    this.govMapService.mapReady$.subscribe((isReady) => {
      if (isReady) {
        this.govMapService.zoom(this.tableData[0].x, this.tableData[0].y, 8);
      }
    });
  }

  onMouseEnter(row: any) {
    // שולח את הערכים למפה כאשר העכבר עובר על שורה
    this.govMapService.showCustomBubble(row.x, row.y);
  }
}
