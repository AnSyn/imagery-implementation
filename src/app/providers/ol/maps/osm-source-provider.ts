import { BaseMapSourceProvider } from '@ansyn/imagery';

export class OsmSourceProvider extends BaseMapSourceProvider {
  supported: string[] = ['OlImap'];
  sourceType = 'OSM';

  protected create(metaData: any): any[] {
    return [];
  }

}
