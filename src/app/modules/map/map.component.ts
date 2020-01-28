import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Vehicle } from '../vehicles/models/vehicle.model';
import { MapService } from './services/map.service';
import { Parking } from '../parking/models/parking.model';
import { PointOfInterest } from '../poi/models/poi.model';
import { Subscription } from 'rxjs';
import { Location } from './models/location';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
	latitude: number = 51.107883;
	longitude: number = 17.038538;

	vehicles: Array<Vehicle>;
	parking: Array<Parking>;
	pointOfInterests: Array<PointOfInterest>;

	parkingVisible: boolean;
	pointOfInterestVisible: boolean;

	markerClusterImage = 'https://raw.githubusercontent.com/googlemaps/v3-utility-library/master/markerclustererplus/images/m';

	private parkingSubscription: Subscription;
	private poiSubscription: Subscription;

	constructor(private mapService: MapService) {
	}

	ngOnInit() {
		this.mapService.observeVehicles()
			.subscribe((vehicles: Array<Vehicle>) => this.vehicles = vehicles);
		this.mapService.getParking().subscribe((parking: Array<Parking>) => this.parking = parking);
		this.mapService.getPOI().subscribe((mapData: Array<PointOfInterest>) => this.pointOfInterests = mapData);
	}

	ngAfterViewInit(): void {
		this.parkingSubscription =
			this.mapService.observeParking()
				.subscribe((visible) => this.parkingVisible = visible);

		this.poiSubscription =
			this.mapService.observePoi()
				.subscribe((visible) => this.pointOfInterestVisible = visible);
	}

	ngOnDestroy(): void {
		this.parkingSubscription.unsubscribe();
		this.poiSubscription.unsubscribe();
	}

	changeLocation(location: Location) {
		this.longitude = location.longitude;
		this.latitude = location.latitude;
	}

	isParkingToggled(): boolean {
		if (this.parkingVisible) {
			return this.parkingVisible;
		}
	}

	isPointOfInterestToggled(): boolean {
		if (this.pointOfInterestVisible) {
			return this.pointOfInterestVisible;
		}
	}

}
