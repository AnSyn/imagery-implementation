import { Component } from '@angular/core';
import { CaseMapState } from '@ansyn/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  imagerySettings: CaseMapState = {
    id: 'id',
    sourceType: 'OSM',
    mapType: 'OlImap',
    flags: {},
    data: {
      position: {
        projectedState: {
          center: [0, 0],
          zoom: 3,
          projection: {
            code: 'EPSG:4326'
          }
        }
      }
    }
  };

  imagery2Settings: CaseMapState = {
    id: 'id2',
    sourceType: 'defaultCesium',
    mapType: 'cesiumMap',
    flags: {},
    data: {
      position: {
        projectedState: {
          center: [0, 0],
          zoom: 3,
          projection: {
            code: 'EPSG:4326'
          }
        }
      }
    }
  };
}
