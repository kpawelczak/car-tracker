import { NgModule } from '@angular/core';
import { VehicleService } from './services/vehicle.service';
import { VehicleRepository } from './services/vehicle.repository';
import { VehicleMarkerComponent } from './components/vehicle-marker/vehicle-marker.component';
import { AgmCoreModule } from '@agm/core';
import { VehicleMarkerInfo } from './components/vehicle-marker-info/vehicle-marker-info.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

@NgModule({
	imports: [
		CommonModule,
		AgmCoreModule,
		MatDialogModule,
		MatChipsModule,
		MatProgressBarModule
	],
	declarations: [
		VehicleMarkerComponent,
		VehicleMarkerInfo
	],
	exports: [
		VehicleMarkerComponent
	],
	providers: [
		VehicleService,
		VehicleRepository
	],
	entryComponents: [
		VehicleMarkerInfo
	]
})
export class VehicleModule {

}
