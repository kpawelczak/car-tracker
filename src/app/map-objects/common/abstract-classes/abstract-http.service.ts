import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class AbstractHttpService<T> {
	private readonly url: string = '';
	private readonly mapObjectType = '';

	protected constructor(private httpClient: HttpClient) {

	}

	abstract getType(): string;

	getData(): Observable<T> {
		return this.httpClient.get<T>(this.url + this.mapObjectType + this.getType());
	}
}
