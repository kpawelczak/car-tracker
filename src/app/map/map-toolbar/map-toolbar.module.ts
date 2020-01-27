import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapToolbarComponent } from './map-toolbar.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
	imports: [
		CommonModule,
		MatIconModule
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
