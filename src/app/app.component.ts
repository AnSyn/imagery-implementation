import { Component, ComponentFactoryResolver } from '@angular/core';
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
        extentPolygon: {
          'type': 'Polygon',
          'coordinates': [
            [
              [
                -117.94293165339445,
                33.82040324951603
              ],
              [
                -117.88739896579649,
                33.82040324951603
              ],
              [
                -117.88739896579649,
                33.80000526593916
              ],
              [
                -117.94293165339445,
                33.80000526593916
              ],
              [
                -117.94293165339445,
                33.82040324951603
              ]
            ]
          ]
        }
      }
    }
  };

}
