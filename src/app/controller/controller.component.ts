import { Component, Input } from '@angular/core';
import { CaseMapState } from '@ansyn/core';
import { ImageryCommunicatorService } from '@ansyn/imagery';
import { OlMapName } from '../providers/maps/ol-imap';
import { CesiumMapName } from '../providers/maps/cesium-map';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.css']
})
export class ControllerComponent {

  _settings: CaseMapState;
  mapOptions = [{ title: 'OpenLayers', value: OlMapName }, { title: 'Cesium', value: CesiumMapName }];
  selectedMapOption = this.mapOptions[0].value;

  @Input()
  public set settings(value: CaseMapState) {
    this._settings = value;
    this.selectedMapOption = this._settings.mapType;
  }

  public get settings(): CaseMapState {
    return this._settings;
  }

  constructor(public communicatorService: ImageryCommunicatorService) {
  }

  onMapSelected(data: string) {
    const commEntitiy = this.communicatorService.provide(this.settings.id);
    commEntitiy.setActiveMap(data, this.settings.data.position).then(() => {
    });
  }
}
