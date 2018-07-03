import { Observable, of } from 'rxjs';
import { GeoJsonObject, Point } from 'geojson';
import { CaseMapExtent, CaseMapPosition } from '@ansyn/core';
import ol_Map from 'ol/map';
import ol_GeoJSON from 'ol/format/geojson';
import { EventEmitter } from '@angular/core';
import { BaseImageryMap, ImageryMap } from '@ansyn/imagery';
import View from 'ol/view';

export const OlMapName = 'OlImap';

@ImageryMap({
  mapType: OlMapName
})
export class OlImap extends BaseImageryMap<any> {
  positionChanged = new EventEmitter();
  olGeoJSON = new ol_GeoJSON();

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
      layers: [...layers]
    });
    if (position) {
      const feature = this.olGeoJSON.readFeature(position.extentPolygon, { featureProjection: projection, dataProjection: 'EPSG:4326' });
      this.mapObject.getView().fit(feature.getGeometry());
    }
    return of(Boolean(this.mapObject));
  }

  resetView(layer: any, position: CaseMapPosition, extent?: CaseMapExtent): Observable<boolean> {
    const view = new View({
      projection: layer.getSource().getProjection()
    });
    this.mapObject.addLayer(layer);
    this.mapObject.setView(view);
    return of(true);
  }

  addLayer(layer: any): void {
  }

  getLayers(): any[] {
    return [];
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
