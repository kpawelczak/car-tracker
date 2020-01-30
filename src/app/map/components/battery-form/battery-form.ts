import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormSnackBarComponent } from './form-snack-bar.component';

@Component({
	selector: 'vehicle-battery-form',
	template: `
		<form [formGroup]="batteryForm">
			<mat-form-field class="map-toolbar-battery-form">
				<input matInput
					   [formControlName]="'vehicleBattery'"
					   type="number">
			</mat-form-field>
		</form>
	`
})
export class BatteryForm implements OnInit, OnDestroy {
	@Input()
	vehicleBattery: number;

	@Output()
	vehicleBatteryChanged = new EventEmitter();

	batteryForm: FormGroup;
	private subscription: Subscription;

	constructor(private formBuilder: FormBuilder,
				private snackBar: MatSnackBar) {
		this.batteryForm = this.formBuilder.group({
			vehicleBattery: [this.vehicleBattery, [
				Validators.required,
				Validators.min(25),
				Validators.max(100)]]
		});
	}

	ngOnInit(): void {
		this.batteryForm.controls['vehicleBattery'].setValue(this.vehicleBattery);

		this.subscription =
			this.batteryForm
				.valueChanges
				.pipe(debounceTime(500))
				.subscribe(() => {
					this.validateBatteryPower();
				});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	validateBatteryPower(): void {
		const batteryPowerValid = this.batteryForm.controls['vehicleBattery'].valid,
			batteryPower = this.batteryForm.controls['vehicleBattery'].value;

		if (batteryPowerValid && this.batteryForm.valid) {
			this.vehicleBatteryChanged.emit(batteryPower);
		} else {
			this.snackBar.openFromComponent(FormSnackBarComponent, {
				duration: 3000
			});
		}

	}
}
