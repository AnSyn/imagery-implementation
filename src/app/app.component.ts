import { Component } from '@angular/core';
import { CaseMapState } from '@ansyn/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  imagerySettings: CaseMapState = {
    id: 'map1',
    sourceType: 'OSM',
    mapType: 'OlImap',
    flags: {},
    data: {
      position: {
        extentPolygon: {
          type: 'Polygon',
          coordinates: [
            [
              [
                -180,
                -90
              ],
              [
                -180,
                90
              ],
              [
                180,
                90
              ],
              [
                180,
                -90
              ],
              [
                -180,
                -90
              ]
            ]
          ]
        }
      }
    }
  };

  imagery2Settings: CaseMapState = {
    id: 'map2',
    sourceType: 'OSM',
    mapType: 'cesiumMap',
    flags: {},
    data: {
      position: {
        extentPolygon: {
          type: 'Polygon',
          coordinates: [
            [
              [
                -180,
                -90
              ],
              [
                -180,
                90
              ],
              [
                180,
                90
              ],
              [
                180,
                -90
              ],
              [
                -180,
                -90
              ]
            ]
          ]
        }
      }
    }
  };
}
