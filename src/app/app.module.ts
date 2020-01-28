import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MapModule } from './modules/map/map.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './common/header/header.component';


@NgModule({
	imports: [
		BrowserModule,
		HttpClientModule,
		MapModule,
		BrowserAnimationsModule
	],
	declarations: [
		AppComponent,
		HeaderComponent
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
