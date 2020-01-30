export class PointOfInterest {

	constructor(readonly name: string,
				readonly location: {
					latitude: number,
					longitude: number
				},
				readonly category: string) {

	}
}
