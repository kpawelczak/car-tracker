import { Component, OnInit } from '@angular/core';
import { Vehicle } from './models/vehicle.model';
import { MapDataResource } from '../mock-data/map-data.resource';
import { MapService } from './services/map.service';
import { Parking } from './models/parking.model';
import { PointOfInterest } from './models/poi.model';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

	vehicles: Array<Vehicle>;
	parking: Array<Parking>;
	pointOfInterests: Array<PointOfInterest>;

	parkingVisible: boolean;
	pointOfInterestVisible: boolean;
	trucksVisible: boolean;
	carsVisible: boolean;

	constructor(private mapDataResource: MapDataResource,
				private mapService: MapService) {

	}

	ngOnInit() {
		this.mapService.getVehicles().subscribe((mapData: Array<Vehicle>) => this.vehicles = mapData);
		this.mapService.getParking().subscribe((parking: Array<Parking>) => this.parking = parking);
		this.mapService.getPOI().subscribe((mapData: Array<PointOfInterest>) => this.pointOfInterests = mapData);

		// this.mapData = this.mapDataResource.getVehicles();
		// this.cars = this.mapData.filter((vehicle) => vehicle.type === 'CAR');
		// this.trucks = this.mapData.filter((vehicle) => vehicle.type === 'TRUCK');
		// this.mapObjects = this.mapObjects.concat(this.cars);
		// this.mapObjects = this.mapObjects.concat(this.trucks);
	}

	toggleParking(): void {
		this.parkingVisible = !this.parkingVisible;
	}

	isParkingToggled(): boolean {
		return this.parkingVisible;
	}

	togglePoi(): void {
		this.pointOfInterestVisible = !this.pointOfInterestVisible;
	}

	isPointOfInterestToggled(): boolean {
		return this.pointOfInterestVisible;
	}

	filterTrucks() {
		this.trucksVisible = !this.trucksVisible;

		if (this.trucksVisible) {
			this.vehicles = this.vehicles.filter((vehicle) => vehicle.type !== 'TRUCK');

		} else {
			this.vehicles = this.vehicles.concat(this.mapService.trucks);
		}
	}

	filterCars() {
		this.carsVisible = !this.carsVisible;

		if (this.carsVisible) {
			this.vehicles = this.vehicles.filter((vehicle) => vehicle.type !== 'CAR');

		} else {
			this.vehicles = this.vehicles.concat(this.mapService.cars);
		}
	}

}
