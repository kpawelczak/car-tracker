import { Component, Input } from '@angular/core';
import { Parking } from '../../models/parking.model';

@Component({
	selector: 'app-parking-marker',
	templateUrl: './parking-marker.component.html'
})
export class ParkingMarkerComponent {
	@Input()
	parking: Parking;

	parkingIcon: string = 'assets/images/parking.svg';
}
