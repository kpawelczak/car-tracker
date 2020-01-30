import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapToolbarComponent } from './map-toolbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
	imports: [
		CommonModule,
		MatIconModule,
		MatFormFieldModule,
		MatSelectModule
	],
	declarations: [
		MapToolbarComponent
	],
	exports: [
		MapToolbarComponent
	]
})
export class MapToolbarModule {

}
