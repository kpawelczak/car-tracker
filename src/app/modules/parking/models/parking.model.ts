export class Parking {

	constructor(readonly location: {
					latitude: number
					longitude: number
				},
				readonly name,
				readonly spacesCount: number,
				readonly availableSpacesCount: number) {
	}

}
