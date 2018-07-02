import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { CaseMapState } from '@ansyn/core';
import { ImageryCommunicatorService } from '@ansyn/imagery';
import { OlMapName } from '../providers/maps/ol-imap';
import { CesiumMapName } from '../providers/maps/cesium-map';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.css']
})
export class ControllerComponent implements OnInit, AfterViewInit {

  _settings: CaseMapState;
  @Input()
  public set settings(value: CaseMapState) {
    this._settings = value;
    this.selectedMapOption = this.mapEngineDictionary[this._settings.mapType];
  };

  public get settings(): CaseMapState {
    return this._settings;
  }

  mapOptions = ['OpenLayers', 'Cesium'];
  selectedMapOption;

  mapEngineDictionary = {};

  constructor(public communicatorService: ImageryCommunicatorService) {
    this.mapEngineDictionary['OpenLayers'] = OlMapName;
    this.mapEngineDictionary['Cesium'] = CesiumMapName;
    this.mapEngineDictionary[OlMapName] = 'OpenLayers';
    this.mapEngineDictionary[CesiumMapName] = 'Cesium';
  }

  ngAfterViewInit() {
  }

  onMapSelected(data: string) {
    const commEntitiy = this.communicatorService.provide(this.settings.id);
    commEntitiy.setActiveMap(this.mapEngineDictionary[data], this.settings.data.position).then(() => {
    });
  }

  ngOnInit() {
  }
}
