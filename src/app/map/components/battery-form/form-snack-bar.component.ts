import { Component } from '@angular/core';

@Component({
	selector: 'snack-bar-component-example-snack',
	template: `
		<span class="form-snack-bar">
		wartość powinna się zawierać między 25 a 100
		</span>`,
	styles: [`
		.form-snack-bar {
			color: #f44336;
		}
	`]
})
export class FormSnackBarComponent {
}
