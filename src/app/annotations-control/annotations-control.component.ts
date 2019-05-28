import {Component, OnInit} from '@angular/core';
import {ImageryCommunicatorService} from '@ansyn/imagery';
import {ANNOTATION_MODE_LIST, AnnotationsVisualizer} from '@ansyn/ol';
import {fromEvent} from 'rxjs';
import {filter, mergeMap, take, tap} from 'rxjs/operators';
import IMAGERY_SETTINGS from '../IMAGERY_SETTINGS';

@Component({
  selector: 'app-annotations-control',
  templateUrl: './annotations-control.component.html',
  styleUrls: ['./annotations-control.component.less']
})
export class AnnotationsControlComponent implements OnInit {
  ANNOTATION_MODE_LIST = ANNOTATION_MODE_LIST;
  annotations: AnnotationsVisualizer;
  reader = new FileReader();

  onFileLoad$ = fromEvent(this.reader, 'load').pipe(
    mergeMap(() => {
      const readerResult: string = <string>this.reader.result;
      const geoJSON = JSON.parse(readerResult);
      const entities = this.annotations.annotationsLayerToEntities(geoJSON);
      return this.annotations.addOrUpdateEntities(entities);
    })
  );

  constructor(protected communicators: ImageryCommunicatorService) {
  }

  onInitMap() {
    const communicator = this.communicators.provide(IMAGERY_SETTINGS.id);
    this.annotations = communicator.getPlugin(AnnotationsVisualizer);
  }

  ngOnInit() {
    this.communicators.instanceCreated.pipe(
      filter(({id}) => id === IMAGERY_SETTINGS.id),
      tap(this.onInitMap.bind(this)),
      take(1)
    ).subscribe();

    this.onFileLoad$.subscribe();
  }

  draw(mode) {
    this.annotations.setMode(this.annotations.mode === mode ? null : mode);
  }

  clear() {
    this.annotations.clearEntities();
  }

  changeFill(color) {
    this.annotations.updateStyle({initial: {fill: color}});
  }

  changeStroke(color) {
    this.annotations.updateStyle({initial: {stroke: color}});
  }

  loadJSON(files: FileList) {
    const file = files.item(0);
    if (file) {
      this.reader.readAsText(file, 'UTF-8');
    }
  }

  drawAnnotationWithIcon(icon: string) {
    const iconSrc = `assets/${icon}.svg`;
    this.communicators.communicators[IMAGERY_SETTINGS.id].getCenter().pipe(
      mergeMap((center) => {
        const feature = {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: createGeometry(center),
              properties: {
                id: 'aaaa-aaaa-aaaa-aaaa'.replace(/a/g, () => Math.round(Math.random() * 100).toString(16)),
                icon: iconSrc
              }
            }
          ]
        };
        const entitie = this.annotations.annotationsLayerToEntities(<any>feature);
        return this.annotations.addOrUpdateEntities(entitie);
      })
    ).subscribe();


    function createGeometry(center) {
      return {
        type: 'Point',
        coordinates: center.coordinates.map(c => Math.random() + c)
      };
    }
  }
}
