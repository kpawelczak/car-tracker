import { Component, OnInit } from '@angular/core';
import { Vehicle } from './models/vehicle.model';
import { MapDataResource } from '../mock-data/map-data.resource';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
	mapObjects: Array<Vehicle> = [];
	constructor(private mapDataResource: MapDataResource) {

	}

	ngOnInit() {
		this.mapObjects = this.mapDataResource.getVehicles();
	}

}
