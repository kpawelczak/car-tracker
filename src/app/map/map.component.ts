import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Location } from './models/location';
import { VehicleRepository } from '../map-objects/vehicles/services/vehicle.repository';
import { Vehicle } from '../map-objects/vehicles/models/vehicle.model';
import { PointOfInterest } from '../map-objects/poi/models/poi.model';
import { Parking } from '../map-objects/parking/models/parking.model';
import { PoiRepository } from '../map-objects/poi/services/poi.repository';
import { ParkingRepository } from '../map-objects/parking/services/parking.repository';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit, OnDestroy, AfterViewChecked {
	latitude: number = 51.107883;
	longitude: number = 17.038538;

	vehicles: Array<Vehicle> = [];
	parking: Array<Parking> = [];
	pointOfInterests: Array<PointOfInterest> = [];

	markerClusterImage = 'https://raw.githubusercontent.com/googlemaps/v3-utility-library/master/markerclustererplus/images/m';

	private subscriptions: Subscription = new Subscription();

	constructor(private vehicleRepository: VehicleRepository,
				private poiRepository: PoiRepository,
				private parkingRepository: ParkingRepository,
				private changeDetectionRef: ChangeDetectorRef) {
	}

	ngOnInit() {
		this.subscriptions.add(
			this.vehicleRepository
				.observeVehicles()
				.subscribe((vehicles: Array<Vehicle>) => this.vehicles = vehicles));

		this.subscriptions.add(
			this.poiRepository.observePointOfInterests()
				.subscribe((pointOfInterests) => this.pointOfInterests = pointOfInterests)
		);
		this.subscriptions.add(
			this.parkingRepository.observeParking()
				.subscribe((parking) => this.parking = parking)
		);
	}

	ngAfterViewChecked(): void {
		this.changeDetectionRef.detectChanges()
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	changeLocation(location: Location) {
		this.longitude = location.longitude;
		this.latitude = location.latitude;
	}

}
