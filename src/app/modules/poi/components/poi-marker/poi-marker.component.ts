import { Component, Input } from '@angular/core';
import { PointOfInterest } from '../../models/poi.model';

@Component({
	selector: 'app-poi-marker',
	templateUrl: './poi-marker.component.html'
})
export class PoiMarkerComponent {
	@Input()
	pointOfInterest: PointOfInterest;

	poiIcon: string = 'assets/images/poi.svg';
}
