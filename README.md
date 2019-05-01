# Imagery Implementation

### Installation
  inside your angular project run
  ``` bash
  npm install @ansyn/imagery @ansyn/ol @angular/matrials @angular/cdk @types/geojson 
  ```
  or
  ```bash
   yarn add @ansyn/imagery @ansyn/ol @angular/matrials @angular/cdk @types/geojson
  ```
## Basic Use

import the Imagery module in your `app.module.ts` and give him the openlayer metadata
and add the openlayer configs as providers
  ```typescript
  ...
import { ImageryModule, MAP_PROVIDERS_CONFIG, MAP_SOURCE_PROVIDERS_CONFIG } from '@ansyn/imagery';
import { AnnotationsVisualizer, OL_CONFIG, OL_PLUGINS_CONFIG, OpenLayerBingSourceProvider, OpenLayersMap } from '@ansyn/ol';
@ngModule({
...
imports: [
  ImageryModule.provide({
        maps: [OpenLayersMap],
        plugins: [AnnotationsVisualizer],
        mapSourceProviders: [OpenLayerBingSourceProvider]
      })
],
providers:[
  {
        provide: OL_PLUGINS_CONFIG,
        useValue: {
          Annotations: {}
        }
      },
      {
        provide: OL_CONFIG,
        useValue: {}
      },
      {
        provide: MAP_PROVIDERS_CONFIG,
        useValue: {
          openLayersMap: {
            defaultMapSource: 'BING'
          }
        }
      },
      {
        provide: MAP_SOURCE_PROVIDERS_CONFIG,
        useValue: {
          'BING': {
            key: '<YOUR_KEY>',
            styles: ['AerialWithLabels']
          }
        }
      }
]
})
```
crate a sample setting file `IMAGERRY_SETTING.ts` inside your root file
```typescript
import { OpenlayersMapName } from '@ansyn/ol';
import { IMapSettings } from '@ansyn/imagery';

const IMAGERY_SETTINGS: IMapSettings = {
  id: 'id',
  worldView: {
    mapType: OpenlayersMapName,
    sourceType: 'BING'
  },
  flags: {},
  data: {
    position: {
      'extentPolygon': {
        'type': 'Polygon',
        'coordinates': [
          [
            [
              -180,
              90
            ],
            [
              180,
              90
            ],
            [
              180,
              -90
            ],
            [
              -180,
              -90
            ],
            [
              -180,
              90
            ]
          ]
        ]
      }
    }
  }
};

export default IMAGERY_SETTINGS;
```
and import it in your `app.component.ts`
```typescript
import { Component } from '@angular/core';
import { IMapSettings } from '@ansyn/imagery';
import IMAGERY_SETTINGS from './IMAGERY_SETTINGS';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  public settings: IMapSettings = IMAGERY_SETTINGS;
}
```
add imagery inside your `app.component.html`
```html
<div class="app">
  <div class="imagery">
      <div>
        <ansyn-imagery-view [settings]="settings"></ansyn-imagery-view>
      </div>
  </div>
</div>
```

add style to your `app.component.css`
```less
div.app {
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}
.imagery {
  display: flex;
  flex: 1;
  box-sizing: border-box;
  padding: 50px 0;
}
.imagery * {
  flex: 1;
  text-align: center;
}

```
## Draw annotations on the map

crate a component annotation-control
```bash
  ng g c annotaions-control
```
install material-community-components for a color picker
```bash
  npm install material-community-components
```
and import them(and other necessary modules) in `app.module.ts`
```typescript
  ...
  import { MatButtonModule, MatIconModule } from '@angular/material';
  import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
  import { MccColorPickerModule } from 'material-community-components';
  ...
  @ngModule({
  declarations: [
    AnnotationsControlComponent,
  ]
    ...
    imports: [
    ...
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MccColorPickerModule.forRoot({
          used_colors: ['#000000', '#123456', '#777666']
        })
  ]
  })
```
change the content in `annotations-control.components.html` to:
```html
<div class="list">
  <button
    *ngFor="let mode of ANNOTATION_MODE_LIST"
    mat-button
    [disabled]="!annotations"
    color="primary"
    [class.mat-accent]="annotations?.mode === mode"
    (click)="draw(mode)">
    {{ mode }}
  </button>

  <button mat-icon-button (click)="clear()">
    <mat-icon aria-label="Example icon-button with a heart icon">delete</mat-icon>
  </button>

  <button mat-button>
    FILL
    <mcc-color-picker [selectedColor]="'#ffffff'"
                      (selected)="changeFill($event)"></mcc-color-picker>
  </button>

  <button mat-button>
    STROKE
    <mcc-color-picker [selectedColor]="'#ffffff'"
                      (selected)="changeStroke($event)"></mcc-color-picker>
  </button>

  <button mat-button>
    <input type="file" (change)="loadJSON($event.target.files)" />
  </button>
</div>
```

change the content in `annotations-control.components.ts` to: 
```typescript
import { Component, OnInit } from '@angular/core';
import IMAGERY_SETTINGS from '../IMAGERY_SETTINGS';
import { ImageryCommunicatorService } from '@ansyn/imagery';
import { ANNOTATION_MODE_LIST, AnnotationsVisualizer } from '@ansyn/ol';
import { fromEvent } from 'rxjs';
import { mergeMap, filter, take, tap } from 'rxjs/operators';

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
      filter(({ id }) => id === IMAGERY_SETTINGS.id),
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
    this.annotations.updateStyle({ initial: { fill: color } });
  }

  changeStroke(color) {
    this.annotations.updateStyle({ initial: { stroke: color } });
  }

  loadJSON(files: FileList) {
    const file = files.item(0);
    if (file) {
      this.reader.readAsText(file, 'UTF-8');
    }
  }
}
```

give your component some style
`annotations-control.component.css`
```css
:host {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
}

.list button {

  margin: 0 10px;
}

```

edit your `app.component.html`
```html
<div class="app">
  <div class="imagery">
    <div>
      <ansyn-imagery-view [settings]="settings"></ansyn-imagery-view>
    </div>
  </div>

  <app-annotations-control></app-annotations-control>

</div>

```
edit the root style `stle.css` :
```css
@import "~@angular/material/prebuilt-themes/indigo-pink.css";
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

body {
  margin: 0;
}

```
