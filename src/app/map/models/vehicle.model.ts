export class Vehicle {

	constructor(readonly name: string,
				readonly plates: string,
				readonly sideNumber: number,
				readonly location: {
					latitude: number
					longitude: number
				},
				readonly type: string,
				readonly status: string,
				readonly battery: number) {

	}

}
