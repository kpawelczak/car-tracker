import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, Output, Renderer2, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatOption } from '@angular/material/core';
import { Location } from '../../models/location';
import { VehicleRepository } from '../../../map-objects/vehicles/services/vehicle.repository';
import { ParkingRepository } from '../../../map-objects/parking/services/parking.repository';
import { PoiRepository } from '../../../map-objects/poi/services/poi.repository';

@Component({
	selector: 'app-map-toolbar',
	templateUrl: './map-toolbar.component.html'
})
export class MapToolbarComponent implements AfterViewInit, AfterViewChecked {
	@ViewChild('mapIcon', { static: false })
	mapIconRef: ElementRef;

	@Output()
	locationSelected = new EventEmitter();

	icons: Array<string> = ['truck.svg', 'car.svg', 'parking.svg', 'poi.svg', 'battery.svg', 'car-avail.svg'];

	batteryPower: number = 95;

	private readonly ICON_TOGGLED_CLASS_NAME = 'mat-icon-toggled';
	private readonly TRUCK_INDEX = 0;
	private readonly CAR_INDEX = 1;
	private readonly PARKING_INDEX = 2;
	private readonly POI_INDEX = 3;
	private readonly BATTERY_INDEX = 4;
	private readonly AVAILABLE_INDEX = 5;

	constructor(private iconRegistry: MatIconRegistry,
				private sanitizer: DomSanitizer,
				private renderer: Renderer2,
				private vehicleRepository: VehicleRepository,
				private parkingRepository: ParkingRepository,
				private poiRepository: PoiRepository) {
		this.registerIcons();
	}

	ngAfterViewInit(): void {
		this.toggleIcon(this.CAR_INDEX);
		this.toggleIcon(this.TRUCK_INDEX);
		this.setIconsTitle();
	}

	ngAfterViewChecked(): void {
		this.filterVehicles();
		this.filterParking();
		this.filterPoi();
	}

	filterObjects(iconIndex: number): void {

		if (iconIndex === this.TRUCK_INDEX) {
			this.toggleIcon(this.TRUCK_INDEX);
		}

		if (iconIndex === this.CAR_INDEX) {
			this.toggleIcon(this.CAR_INDEX);
		}

		if (iconIndex === this.PARKING_INDEX) {
			this.toggleIcon(this.PARKING_INDEX);
		}

		if (iconIndex === this.POI_INDEX) {
			this.toggleIcon(this.POI_INDEX);
		}

		if (iconIndex === this.BATTERY_INDEX) {
			this.toggleIcon(this.BATTERY_INDEX);
		}

		if (iconIndex === this.AVAILABLE_INDEX) {
			this.toggleIcon(this.AVAILABLE_INDEX);
		}

		this.filterVehicles();
		this.filterParking();
		this.filterPoi();
	}

	filterVehicles(): void {
		this.vehicleRepository
			.filterVehicles(
				this.isFilterToggled(this.CAR_INDEX),
				this.isFilterToggled(this.TRUCK_INDEX),
				this.isFilterToggled(this.AVAILABLE_INDEX),
				this.isFilterToggled(this.BATTERY_INDEX),
				this.batteryPower);
	}

	filterParking(): void {
		this.parkingRepository
			.filterParking(this.isFilterToggled(this.PARKING_INDEX));
	}

	filterPoi(): void {
		this.poiRepository
			.filterPointOfInterests(this.isFilterToggled(this.POI_INDEX));
	}

	changeLocation(option: MatOption): void {
		let location: Location;

		if (option.value === 'Warszawa') {
			location = {
				latitude: 52.237049,
				longitude: 21.017532
			};
		} else {
			location = {
				latitude: 51.107883,
				longitude: 17.038538
			};
		}

		this.locationSelected.emit(location);
	}

	private toggleIcon(iconIndex: number): void {
		const iconEl = this.mapIconRef.nativeElement.querySelector('[data-icon-index="' + iconIndex, ':]'),
			iconElToggled = iconEl.classList.contains(this.ICON_TOGGLED_CLASS_NAME);

		if (iconElToggled) {
			this.renderer.removeClass(iconEl, this.ICON_TOGGLED_CLASS_NAME);
		} else {
			this.renderer.addClass(iconEl, this.ICON_TOGGLED_CLASS_NAME);
		}
	}

	private isFilterToggled(iconIndex: number): boolean {
		const iconEl = this.mapIconRef.nativeElement.querySelector('[data-icon-index="' + iconIndex, ':]'),
			isIconToggled = iconEl.classList.contains(this.ICON_TOGGLED_CLASS_NAME);

		return isIconToggled;
	}

	private registerIcons(): void {
		this.icons.forEach((icon) => {
			this.iconRegistry.addSvgIcon(
				icon,
				this.sanitizer.bypassSecurityTrustResourceUrl(`assets/images/${icon}`));
		});
	}

	private setIconsTitle(): void {
		for (let i = 0; i < this.icons.length; i++) {

			const iconEl = this.mapIconRef.nativeElement.querySelector('[data-icon-index="' + i, ':]'),
				titleTexts = [
					'ciężarówki',
					'samochody',
					'parkingi',
					'ciekawe miejsca',
					`pojazdy z poziomem baterii ponad ${this.batteryPower}% `,
					'dostępne pojazdy'
				];

			this.renderer.setAttribute(iconEl, 'title', titleTexts[i]);
		}
	}
}
