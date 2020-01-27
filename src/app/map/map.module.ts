import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { MapService } from './services/map.service';
import { AgmCoreModule } from '@agm/core';
import { googleMapsApiKey } from '../keys/google-maps-key';
import { MapDataResource } from '../mock-data/map-data.resource';
import { MapMarkerComponent } from './map-marker/map-marker.component';
import { MapToolbarModule } from './map-toolbar/map-toolbar.module';


@NgModule({
	imports: [
		CommonModule,
		AgmCoreModule.forRoot({
			apiKey: googleMapsApiKey
		}),
		MapToolbarModule
	],
	declarations: [
		MapComponent,
		MapMarkerComponent
	],
	exports: [
		MapComponent
	],
	providers: [
		MapService,
		MapDataResource]
})
export class MapModule {

}
