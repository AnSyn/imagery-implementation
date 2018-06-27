import { BaseMapSourceProvider } from '@ansyn/imagery';

export class DefaultCesium extends BaseMapSourceProvider {
  supported: string[] = ['cesiumMap'];
  sourceType = 'defaultCesium';

  protected create(metaData: any): any[] {
    return [];
  }

}
