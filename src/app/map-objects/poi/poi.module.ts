import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { PoiMarkerComponent } from './components/poi-marker/poi-marker.component';
import { PoiService } from './services/poi.service';
import { PoiRepository } from './services/poi.repository';

@NgModule({
	imports: [
		AgmCoreModule
	],
	declarations: [
		PoiMarkerComponent
	],
	exports: [
		PoiMarkerComponent
	],
	providers: [
		PoiService,
		PoiRepository
	]
})
export class PoiModule {

}
