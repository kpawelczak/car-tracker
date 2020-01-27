import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MapModule } from './map/map.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
	imports: [
		BrowserModule,
		HttpClientModule,
		MapModule,
		BrowserAnimationsModule
	],
	declarations: [
		AppComponent
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
