import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { MapService } from './services/map.service';
import { AgmCoreModule } from '@agm/core';
import { googleMapsApiKey } from '../keys/google-maps-key';
import { MapToolbarModule } from './map-toolbar/map-toolbar.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { MapMarkerInfo } from './map-markers/vehicle-marker/vehicle-marker-info/vehicle-marker-info.component';
import { VehicleMarkerComponent } from './map-markers/vehicle-marker/vehicle-marker.component';
import { PoiMarkerComponent } from './map-markers/poi-marker/poi-marker.component';
import { ParkingMarkerComponent } from './map-markers/parking-marker/parking-marker.component';


@NgModule({
	imports: [
		CommonModule,
		AgmCoreModule.forRoot({
			apiKey: googleMapsApiKey
		}),
		AgmJsMarkerClustererModule,
		MapToolbarModule,
		MatDialogModule,
		MatButtonModule
	],
	declarations: [
		MapComponent,
		VehicleMarkerComponent,
		MapMarkerInfo,
		PoiMarkerComponent,
		ParkingMarkerComponent
	],
	exports: [
		MapComponent
	],
	entryComponents: [MapMarkerInfo],
	providers: [MapService]
})
export class MapModule {

}
