import { NgModule } from '@angular/core';
import { VehicleService } from './services/vehicle.service';
import { VehicleRepository } from './services/vehicle.repository';
import { VehicleMarkerComponent } from './components/vehicle-marker/vehicle-marker.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
	imports: [
		AgmCoreModule
	],
	declarations: [
		VehicleMarkerComponent
	],
	exports: [
		VehicleMarkerComponent
	],
	providers: [
		VehicleService,
		VehicleRepository
	]

})
export class VehicleModule {

}
