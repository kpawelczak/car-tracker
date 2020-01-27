import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Vehicle } from '../../../models/vehicle.model';

@Component({
	templateUrl: './vehicle-marker-info.component.html'
})
export class MapMarkerInfo {
	constructor(
		public dialogRef: MatDialogRef<MapMarkerInfo>,
		@Inject(MAT_DIALOG_DATA) public vehicle: Vehicle) {
	}
}
