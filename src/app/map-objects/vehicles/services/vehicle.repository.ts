import { Injectable } from '@angular/core';
import { VehicleService } from './vehicle.service';
import { Observable, Subject } from 'rxjs';
import { Vehicle } from '../models/vehicle.model';
import { take } from 'rxjs/operators';

@Injectable()
export class VehicleRepository {
	private vehicles$ = new Subject<Array<Vehicle>>();
	private vehicles: Array<Vehicle> = [];

	constructor(private vehicleService: VehicleService) {
		this.vehicleService.getVehicles()
			.pipe(take(1))
			.subscribe(
				(vehicles) => {
					this.vehicles = vehicles;
					this.vehicles$.next(this.vehicles);
				},
			(error) => console.log(error)
			);
	}

	observeVehicles(): Observable<Array<Vehicle>> {
		return this.vehicles$.asObservable();
	}

	filterVehicles(filterCars: boolean,
				   filterTrucks: boolean,
				   filterAvailable: boolean,
				   filterBattery: boolean,
				   batteryPower: number): void {

		let filteredVehicles = [...this.vehicles];
		filteredVehicles = filteredVehicles.filter((vehicle) => {

				if (!filterCars) {

					if (vehicle.type === 'CAR') {
						return false;
					}
				}
				if (!filterTrucks) {

					if (vehicle.type === 'TRUCK') {
						return false;
					}
				}

				if (filterBattery) {

					if (!(vehicle.battery > batteryPower)) {
						return false;
					}
				}

				if (filterAvailable) {

					if (vehicle.status !== 'AVAILABLE') {
						return false;
					}
				}
				return true
			}
		);

		this.vehicles$.next(filteredVehicles);
	}
}
