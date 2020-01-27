import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Vehicle } from './models/vehicle.model';
import { MapDataResource } from '../mock-data/map-data.resource';
import { MapService } from './services/map.service';
import { Parking } from './models/parking.model';
import { PointOfInterest } from './models/poi.model';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
	vehicles: Array<Vehicle>;
	parking: Array<Parking>;
	pointOfInterests: Array<PointOfInterest>;

	parkingVisible: boolean;
	pointOfInterestVisible: boolean;

	private parkingSubscription: Subscription; //TODO nazwa
	private poiSubscription: Subscription; //TODO

	constructor(private mapDataResource: MapDataResource,
				private mapService: MapService) {
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

	toggleParking(): void {
		this.parkingVisible = !this.parkingVisible;
	}

	isParkingToggled(): boolean {
		if (this.parkingVisible) {
			return this.parkingVisible;
		}

	}

	togglePoi(): void {
		this.pointOfInterestVisible = !this.pointOfInterestVisible;
	}

	isPointOfInterestToggled(): boolean {
		if (this.pointOfInterestVisible) {
			return this.pointOfInterestVisible;
		}
	}

}
