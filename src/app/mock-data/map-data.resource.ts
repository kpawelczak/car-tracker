import { Injectable } from '@angular/core';

import * as rawVehicleData from './vehicle.json';
import { Vehicle } from '../map/models/vehicle.model';

@Injectable()
export class MapDataResource {

	private vehicles: Array<any> = [];

	constructor() {
		this.prepareVehicleData();
	}

	getVehicles(): Array<Vehicle> {
		return this.vehicles;
	}

	private prepareVehicleData(): any {

		const results = (rawVehicleData as any).objects;

		results.forEach((vehicle) => this.vehicles.push(new Vehicle(
			vehicle.name,
			vehicle.platesNumber,
			vehicle.sideNumber,
			vehicle.location,
			vehicle.type,
			vehicle.status,
			vehicle.batteryLevelPct
		)));
	}

}
