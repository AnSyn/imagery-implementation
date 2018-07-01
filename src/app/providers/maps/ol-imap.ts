import { Observable, of } from 'rxjs';
import { GeoJsonObject, Point } from 'geojson';
import { CaseMapExtent, CaseMapPosition } from '@ansyn/core';
import ol_Map from 'ol/map';
import ol_GeoJSON from 'ol/format/geojson';
import { EventEmitter } from '@angular/core';
import { ImageryMap, IMap } from '@ansyn/imagery';

@ImageryMap({
  mapType: 'OlImap'
})
export class OlImap extends IMap {
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
    const feature = this.olGeoJSON.readFeature(position.extentPolygon, { featureProjection: projection, dataProjection: 'EPSG:4326' });
    console.log(feature);

    this.mapObject.getView().fit(feature.getGeometry());
    // const vector: ol_VectorLayer = new ol_VectorLayer({ source: new ol_SourceVector({features: [feature] })});
    // this.mapObject.addLayer(vector);
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
