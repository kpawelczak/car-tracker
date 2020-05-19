import { Component } from '@angular/core';
import { parkingBackup, poiBackup, vehiclesBackup, vehiclesNames } from './car-tracker.backup';
import { AngularFirestore } from '@angular/fire/firestore';
import { Parking } from '../map-objects/parking/models/parking.model';
import { Vehicle } from '../map-objects/vehicles/models/vehicle.model';
import { PointOfInterest } from '../map-objects/poi/models/poi.model';

@Component({
	selector: 'db-backup',
	template: `
		<button (click)="add()">GenerateDB</button>`
})
export class BackupComponent {

	vehicles_ = vehiclesBackup;
	parking_ = parkingBackup;
	poi_ = poiBackup;

	constructor(public database: AngularFirestore) {

	}

	add(): void {
		for (let i = 0; i < this.vehicles().length; i++) {
			this.database.collection('vehicles').add(this.vehicles()[i]);
		}

		for (let i = 0; i < this.parking().length; i++) {
			this.database.collection('parking').add(this.parking()[i]);
		}

		for (let i = 0; i < this.pointOfInterests().length; i++) {
			this.database.collection('poi').add(this.pointOfInterests()[i]);
		}
	}

	private vehicles(): Array<Vehicle> {
		const vehicles = [];

		for (let i = 0; i < this.vehicles_.length; i++) {
			const battery = Math.floor(Math.random() * 100);

			const vehicle = {
				name: this.createName(),
				plates: this.createPlates(this.vehicles_[i]),
				sideNumber: this.createSideNumber(),
				location: this.vehicles_[i].location,
				status: this.vehicles_[i].status,
				type: this.vehicles_[i].type,
				battery: battery,
				rangeKm: this.createRangeKm(battery),
				address: this.vehicles_[i].address
			};

			vehicles.push(vehicle);
		}

		return vehicles;
	}

	private parking(): Array<Parking> {
		const parking = [];

		for (let i = 0; i < this.parking_.length; i++) {
			const parkingSpot = {
				name: this.parking_[i].name,
				location: this.parking_[i].location,
				spacesCount: this.parking_[i].spacesCount,
				availableSpacesCount: this.parking_[i].availableSpacesCount
			};

			parking.push(parkingSpot);
		}

		return parking;
	}

	private pointOfInterests(): Array<PointOfInterest> {
		const pointOfInterests = [];

		for (let i = 0; i < this.poi_.length; i++) {
			const poi = {
				name: this.poi_[i].name,
				location: this.poi_[i].location
			};

			pointOfInterests.push(poi);
		}

		return pointOfInterests;
	}

	private createSideNumber(): number {
		return Math.floor(Math.random() * 1000);
	}

	private createPlates(vehicle: Vehicle): string {
		const isWroclaw = vehicle.location.longitude < 20;

		if (isWroclaw) {
			return 'DW' + 'DEV' + Math.floor(Math.random() * 1000);
		} else {
			return 'WA' + 'DEV' + Math.floor(Math.random() * 1000);
		}
	}

	private createRangeKm(battery): number {
		return Math.floor(battery * 2.4);
	}

	private createName(): string {
		const randomNumber = Math.floor(Math.random() * vehiclesNames.length);

		return vehiclesNames[randomNumber];
	}
}
