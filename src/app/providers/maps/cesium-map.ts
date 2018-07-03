import { GeoJsonObject, Point } from 'geojson';
import { Observable, of } from 'rxjs';
import { CaseMapPosition } from '@ansyn/core';
import { BaseImageryMap, ImageryMap } from '@ansyn/imagery';

export const CesiumMapName = 'cesiumMap';
Cesium.buildModuleUrl.setBaseUrl('assets/Cesium/');

@ImageryMap({
  mapType: CesiumMapName
})
export class CesiumMap extends BaseImageryMap<any> {
  static groupLayers = new Map<string, any>();

  initMap(element: HTMLElement, layers: any, position?: CaseMapPosition): Observable<boolean> {
    this.mapObject = new Cesium.Viewer(element, {
      imageryProvider: layers[0]
    });

    if (position) {
      const rec = [...position.extentPolygon.coordinates[0][0], ...position.extentPolygon.coordinates[0][2]];
      this.mapObject.camera.setView({
        destination: Cesium.Rectangle.fromDegrees(...rec)
      });
    }
    return of(true);
  }

  getCenter(): Observable<Point> {
    return Observable.throw(new Error('Method not implemented.'));
  }

  setCenter(center: Point, animation: boolean): Observable<boolean> {
    return Observable.throw(new Error('Method not implemented.'));
  }

  toggleGroup(groupName: string) {
    throw new Error('Method not implemented.');
  }

  resetView(layer: any): Observable<boolean> {
    const layers = this.mapObject.imageryLayers;
    const baseLayer = layers.get(0);
    layers.remove(baseLayer);
    layers.addImageryProvider(layer);
    return of(true);
  }

  addLayer(layer: any): void {
    throw new Error('Method not implemented.');
  }

  removeLayer(layer: any): void {
    throw new Error('Method not implemented.');
  }

  setPosition(position: CaseMapPosition): Observable<boolean> {
    return Observable.throw(new Error('Method not implemented.'));
  }

  getPosition(): Observable<CaseMapPosition> {
    return Observable.throw(new Error('Method not implemented.'));
  }

  setRotation(rotation: number): void {
    throw new Error('Method not implemented.');
  }

  updateSize(): void {
    throw new Error('Method not implemented.');
  }

  addGeojsonLayer(data: GeoJsonObject) {
    throw new Error('Method not implemented.');
  }

  setAutoImageProcessing(shouldPerform: boolean): void {
    throw new Error('Method not implemented.');
  }

  setManualImageProcessing(processingParams: Object): void {
    throw new Error('Method not implemented.');
  }

  setPointerMove(enable: boolean) {
  }

  getPointerMove() {
    return new Observable();
  }

  getLayers(): any[] {
    return [];
  }

  addLayerIfNotExist() {

  }

  getRotation(): number {
    return NaN;
  }

  dispose() {
  }

}
