import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MapService } from '../services/map.service';
import { Vehicle } from '../models/vehicle.model';
import { take, tap } from 'rxjs/operators';

@Component({
	selector: 'app-map-toolbar',
	templateUrl: './map-toolbar.component.html'
})
export class MapToolbarComponent implements OnInit, AfterViewInit {
	@ViewChild('mapIcon', { static: false })
	mapIconRef: ElementRef;

	icons: Array<string> = ['truck.svg', 'car.svg', 'parking.svg', 'poi.svg', 'battery.svg', 'car-avail.svg'];

	private vehicles: Array<Vehicle>;
	private cars: Array<Vehicle>;
	private trucks: Array<Vehicle>;

	private readonly FILTERED_OBJECTS_CLASS_NAME = 'mat-icon-filtered';
	private readonly TRUCK_INDEX = 0;
	private readonly CAR_INDEX = 1;
	private readonly PARKING_INDEX = 2;
	private readonly POI_INDEX = 3;
	private readonly BATTERY_INDEX = 4;
	private readonly AVAILABLE_INDEX = 5;
	private readonly TYPE_CAR = 'CAR';
	private readonly TYPE_TRUCK = 'TRUCK';
	private readonly VEHICLE_STATUS = 'AVAILABLE';

	constructor(private iconRegistry: MatIconRegistry,
				private sanitizer: DomSanitizer,
				private renderer: Renderer2,
				private mapService: MapService) {
		this.registerIcons();
	}

	ngOnInit(): void {
		this.mapService.observeVehicles()
			.pipe(
				take(1),
				tap((vehicles) => {
					this.cars = vehicles.filter((vehicle) => vehicle.type === this.TYPE_CAR);
					this.trucks = vehicles.filter((vehicle) => vehicle.type === this.TYPE_TRUCK);
				}))
			.subscribe((vehicles) => this.vehicles = vehicles);
	}

	ngAfterViewInit(): void {
		this.mapService.observeParking()
			.pipe(
				take(1),
				tap((visible) => {
					if (!visible) {
						this.toggleIcon(this.PARKING_INDEX);
					}
				}))
			.subscribe();

		this.mapService.observePoi()
			.pipe(
				take(1),
				tap((visible) => {
					if (!visible) {
						this.toggleIcon(this.POI_INDEX);
					}
				}))
			.subscribe();

		this.setIconsTitle();
		this.toggleIcon(this.BATTERY_INDEX);
		this.toggleIcon(this.AVAILABLE_INDEX);
	}

	filterObjects(iconIndex: number): void {
		this.vehicles = [];

		if (iconIndex === this.TRUCK_INDEX) {
			this.toggleIcon(this.TRUCK_INDEX);
		}

		if (iconIndex === this.CAR_INDEX) {
			this.toggleIcon(this.CAR_INDEX);
		}

		if (iconIndex === this.PARKING_INDEX) {
			this.toggleIcon(this.PARKING_INDEX);
			this.mapService.toggleParking();
		}

		if (iconIndex === this.POI_INDEX) {
			this.toggleIcon(this.POI_INDEX);
			this.mapService.togglePoi();
		}

		if (iconIndex === this.BATTERY_INDEX) {
			this.toggleIcon(this.BATTERY_INDEX);
		}

		if (iconIndex === this.AVAILABLE_INDEX) {
			this.toggleIcon(this.AVAILABLE_INDEX);
		}

		this.filterCars();
		this.filterTrucks();
		this.filterAvailableVehicles();
		this.filterVehiclesBattery();
	}

	private filterAvailableVehicles() {
		const availableVehicles = this.vehicles.filter((vehicle) => vehicle.status === this.VEHICLE_STATUS);

		if (this.isFilterToggled(this.AVAILABLE_INDEX)) {
			this.vehicles = availableVehicles;
			this.mapService.filterVehicles(this.vehicles);
		} else {
			this.mapService.filterVehicles(this.vehicles);
		}
	}

	private filterVehiclesBattery() {
		const vehiclesFullBattery = this.vehicles.filter((vehicle) => vehicle.battery > 95);
		let vehicles = this.vehicles;

		if (this.isFilterToggled(this.BATTERY_INDEX)) {
			this.mapService.filterVehicles(vehicles);
		} else {
			vehicles = vehiclesFullBattery;
			this.mapService.filterVehicles(vehicles);
		}
	}

	private filterCars(): void {
		let filteredCars = this.vehicles.filter((vehicle) => vehicle.type !== this.TYPE_CAR);

		if (!this.isFilterToggled(this.CAR_INDEX)) {
			this.vehicles = this.vehicles.concat(this.cars);
			this.mapService.filterVehicles(this.vehicles);
		} else {
			this.vehicles = filteredCars;
			this.mapService.filterVehicles(this.vehicles);
		}
	}

	private filterTrucks(): void {
		let filteredTrucks = this.vehicles.filter((vehicle) => vehicle.type !== this.TYPE_TRUCK);

		if (!this.isFilterToggled(this.TRUCK_INDEX)) {
			this.vehicles = this.vehicles.concat(this.trucks);
			this.mapService.filterVehicles(this.vehicles);
		} else {
			this.vehicles = filteredTrucks;
			this.mapService.filterVehicles(this.vehicles);
		}
	}

	private toggleIcon(iconIndex: number): void {
		const iconEl = this.mapIconRef.nativeElement.querySelector('[data-icon-index="' + iconIndex, ':]'),
			iconElFiltered = iconEl.classList.contains(this.FILTERED_OBJECTS_CLASS_NAME);

		if (iconElFiltered) {
			this.renderer.removeClass(iconEl, this.FILTERED_OBJECTS_CLASS_NAME);
		} else {
			this.renderer.addClass(iconEl, this.FILTERED_OBJECTS_CLASS_NAME);
		}
	}

	private isFilterToggled(iconIndex: number): boolean {
		const iconEl = this.mapIconRef.nativeElement.querySelector('[data-icon-index="' + iconIndex, ':]');
		return iconEl.classList.contains(this.FILTERED_OBJECTS_CLASS_NAME);
	}

	private registerIcons() {
		this.icons.forEach((icon) => {
			this.iconRegistry.addSvgIcon(
				icon,
				this.sanitizer.bypassSecurityTrustResourceUrl(`assets/images/${icon}`));
		});
	}

	private setIconsTitle(): void {
		for (let i = 0; i < this.icons.length; i++) {
			const iconEl = this.mapIconRef.nativeElement.querySelector('[data-icon-index="' + i, ':]'),
				titleTexts = ['ciężarówki', 'samochody', 'parkingi', 'ciekawe miejsca', 'pojazdy z pełną baterią', 'dostępne pojazdy'];
			this.renderer.setAttribute(iconEl, 'title', titleTexts[i]);
		}
	}
}
