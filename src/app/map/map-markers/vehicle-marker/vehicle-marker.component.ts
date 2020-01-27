import { Component, Input } from '@angular/core';
import { Vehicle } from '../../models/vehicle.model';
import { Parking } from '../../models/parking.model';
import { PointOfInterest } from '../../models/poi.model';
import { MatDialog } from '@angular/material/dialog';
import { MapMarkerInfo } from './vehicle-marker-info/vehicle-marker-info.component';

@Component({
	selector: 'app-map-marker',
	templateUrl: './vehicle-marker.component.html'
})
export class VehicleMarkerComponent {
	@Input()
	vehicle: Vehicle;






	poiIcon: string = 'assets/images/poi.svg';

	constructor(public dialog: MatDialog) {
	}

	openDialog(mapObject: any): void {
		this.dialog.open(MapMarkerInfo, {
			width: '250px',
			data: {
				name: mapObject.name,
				plates: mapObject.plates,
				sideNumber: mapObject.sideNumber,
				battery: mapObject.battery
			},
			position:{
				top: '20%'
			}
		});
	}

	vehicleMarker(vehicle: Vehicle): string {
		const isVehicleAvailable = vehicle.status !== 'AVAILABLE',
			isCar = vehicle.type === 'CAR',
			isTruck = vehicle.type === 'TRUCK';

		if (isCar) {
			if (isVehicleAvailable) {
				return 'assets/images/car-disabled.svg';
			} else {
				return 'assets/images/car.svg';
			}

		}

		if (isTruck) {
			if (isVehicleAvailable) {
				return 'assets/images/truck_gray.svg';
			} else {
				return 'assets/images/truck.svg';
			}
		}
	}

}
