import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MapModule } from './map/map.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './common/header/header.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BackupComponent } from './backup/backup';


@NgModule({
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
		HttpClientModule,
		MapModule
	],
	declarations: [
		AppComponent,
		HeaderComponent,
		BackupComponent
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
