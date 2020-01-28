import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Vehicle } from '../../../models/vehicle.model';
import { ThemePalette } from '@angular/material/core';

@Component({
	templateUrl: './vehicle-marker-info.component.html'
})
export class MapMarkerInfo {
	vehicleAvailable: string = 'dostępny';
	vehicleUnAvailable: string = 'niedostępny';


	constructor(@Inject(MAT_DIALOG_DATA) public vehicle: Vehicle) {
	}

	getProgressBarColor(): ThemePalette {

		if (this.vehicle.battery >= 50 && this.vehicle.battery < 80) {
			return 'accent';
		} else if (this.vehicle.battery < 50) {
			return 'warn';
		} else {
			return 'primary';
		}

	}

	getVehicleStatus(): string {
		if (this.vehicle.status === 'AVAILABLE') {
			return this.vehicleAvailable;
		} else {
			return this.vehicleUnAvailable;
		}
	}

	isUnAvailable(): boolean {
		return this.getVehicleStatus() !== this.vehicleAvailable;
	}
}
