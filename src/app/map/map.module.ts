import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { AgmCoreModule } from '@agm/core';
import { googleMapsApiKey } from '../keys/google-maps-key';
import { MapToolbarModule } from './components/map-toolbar/map-toolbar.module';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { VehicleModule } from '../map-objects/vehicles/vehicle.module';
import { PoiModule } from '../map-objects/poi/poi.module';
import { ParkingModule } from '../map-objects/parking/parking.module';


@NgModule({
	imports: [
		CommonModule,
		AgmCoreModule.forRoot({
			apiKey: googleMapsApiKey
		}),
		AgmJsMarkerClustererModule,
		VehicleModule,
		PoiModule,
		ParkingModule,
		MapToolbarModule
	],
	declarations: [
		MapComponent
	],
	exports: [
		MapComponent
	]
})
export class MapModule {

}
