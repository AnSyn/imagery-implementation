import { ImageryMap, IMap } from '@ansyn/imagery';
import { empty, Observable, of } from 'rxjs';
import { GeoJsonObject, Point } from 'geojson';
import { CaseMapExtent, CaseMapPosition } from '@ansyn/core';
import ScaleLine from 'ol/control/scaleline';
import ol_Map from 'ol/map';
import { EventEmitter } from '@angular/core';
import View from 'ol/view';
import proj from 'ol/proj';

@ImageryMap({
  mapType: 'OlImap'
})
export class OlImap extends IMap {
  positionChanged = new EventEmitter();
  getCenter(): Observable<Point> {
    return undefined;
  }

  setCenter(center: Point, animation: boolean): Observable<boolean> {
    return undefined;
  }

  toggleGroup(groupName: string): any {
    return undefined;
  }

  initMap(element: HTMLElement, layers?: any, position?: CaseMapPosition): Observable<boolean> {
    const projection = 'EPSG:3857';
    this.mapObject = new ol_Map({
      target: element,
      layers: [...layers],
      view: new View({
        projection,
        center: proj.transform(position.projectedState.center, position.projectedState.projection.code, projection),
        zoom: position.projectedState.zoom
      })
    });
    return of(Boolean(this.mapObject));
  }

  resetView(layer: any, position: CaseMapPosition, extent?: CaseMapExtent): Observable<boolean> {
    return undefined;
  }

  addLayer(layer: any): void {
  }

  getLayers(): any[] {
    return undefined;
  }

  removeLayer(layer: any): void {
  }

  setPosition(position: CaseMapPosition): Observable<boolean> {
    return undefined;
  }

  setRotation(rotation: number): void {
  }

  getRotation(): number {
    return undefined;
  }

  getPosition(): Observable<CaseMapPosition> {
    return undefined;
  }

  updateSize(): void {
  }

  addGeojsonLayer(data: GeoJsonObject): any {
    return undefined;
  }

  dispose(): void {
  }

  addLayerIfNotExist(layer: any): any {
    return undefined;
  }

}
