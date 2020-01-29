import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { ParkingService } from './services/parking.service';
import { ParkingRepository } from './services/parking.repository';
import { ParkingMarkerComponent } from './components/parking-marker/parking-marker.component';

@NgModule({
	imports: [
		AgmCoreModule
	],
	declarations: [
		ParkingMarkerComponent
	],
	exports: [
		ParkingMarkerComponent
	],
	providers: [
		ParkingService,
		ParkingRepository
	]
})
export class ParkingModule {

}
