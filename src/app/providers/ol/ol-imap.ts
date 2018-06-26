import { ImageryMap, IMap } from '@ansyn/imagery';
import { empty, Observable } from 'rxjs';
import { GeoJsonObject, Point } from 'geojson';
import { CaseMapExtent, CaseMapPosition } from '@ansyn/core';

@ImageryMap({
  mapType: 'OlImap'
})
export class OlImap extends IMap {
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
    return empty();
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
