import { BaseMapSourceProvider } from '@ansyn/imagery';
import OSM from 'ol/source/osm';
import TileLayer from 'ol/layer/tile';
import proj from 'ol/proj';

export class OsmSourceProvider extends BaseMapSourceProvider {
  supported: string[] = ['OlImap'];
  sourceType = 'OSM';
  private extent = proj.transformExtent([-180, -90, 180, 90], 'EPSG:4326', 'EPSG:3857');;

  protected create(metaData: any): any[] {
    const osmLayer = new TileLayer({
      source: new OSM(),
      extent: this.extent
    });

    return [osmLayer];
  }

}
