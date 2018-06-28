import { BaseMapSourceProvider, ImageryMapSource } from '@ansyn/imagery';
import OSM from 'ol/source/osm';
import TileLayer from 'ol/layer/tile';
import proj from 'ol/proj';
import { OlImap } from '../maps/ol-imap';
import { CesiumMap } from '../maps/cesium-map';
import { CaseMapState } from '@ansyn/core';
import { IMapConstructor } from '@ansyn/imagery/model/imap';

@ImageryMapSource({
  supported: [OlImap, CesiumMap],
  sourceType: 'OSM'
})
export class OsmSourceProvider extends BaseMapSourceProvider {

  protected create(metaData: CaseMapState): any[] {
    switch (metaData.mapType) {
      case (<IMapConstructor> OlImap).mapType: {
        const olOsmLayer = new TileLayer({
          source: new OSM(),
          extent: proj.transformExtent([-180, -90, 180, 90], 'EPSG:4326', 'EPSG:3857')
        });
        return [olOsmLayer];
      }

      case (<IMapConstructor> CesiumMap).mapType: {
        const cesiumOsmLayer = Cesium.createOpenStreetMapImageryProvider({ url : 'https://a.tile.openstreetmap.org/' });
        return [cesiumOsmLayer];
      }
      default:
        return [];
    }
  }

}
