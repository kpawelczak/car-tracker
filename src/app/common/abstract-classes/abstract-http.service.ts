import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class AbstractHttpService<T> {
	private readonly url: string = 'https://dev.vozilla.pl/api-client-portal';
	private readonly mapObjectType = '/map?objectType=';

	protected constructor(private httpClient: HttpClient) {

	}

	abstract getType(): string

	getData(): Observable<T> {
		return this.httpClient.get<T>(this.url + this.mapObjectType + this.getType());
	}
}
