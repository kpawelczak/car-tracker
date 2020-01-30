import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapToolbarComponent } from './map-toolbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BatteryForm } from '../battery-form/battery-form';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FormSnackBarComponent } from '../battery-form/form-snack-bar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatIconModule,
		MatFormFieldModule,
		MatSelectModule,
		MatInputModule,
		MatSnackBarModule
	],
	declarations: [
		MapToolbarComponent,
		BatteryForm,
		FormSnackBarComponent
	],
	exports: [
		MapToolbarComponent
	],
	entryComponents: [
		FormSnackBarComponent
	]
})
export class MapToolbarModule {

}
