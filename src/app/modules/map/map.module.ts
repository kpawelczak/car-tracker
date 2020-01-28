import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { MapService } from './services/map.service';
import { AgmCoreModule } from '@agm/core';
import { googleMapsApiKey } from '../../keys/google-maps-key';
import { MapToolbarModule } from './components/map-toolbar/map-toolbar.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { MapMarkerInfo } from '../vehicles/components/vehicle-marker/vehicle-marker-info/vehicle-marker-info.component';
import { VehicleMarkerComponent } from '../vehicles/components/vehicle-marker/vehicle-marker.component';
import { PoiMarkerComponent } from '../poi/components/poi-marker/poi-marker.component';
import { ParkingMarkerComponent } from '../parking/components/parking-marker/parking-marker.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
	imports: [
		CommonModule,
		AgmCoreModule.forRoot({
			apiKey: googleMapsApiKey
		}),
		AgmJsMarkerClustererModule,
		MapToolbarModule,
		MatDialogModule,
		MatButtonModule,
		MatChipsModule,
		MatProgressBarModule
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
