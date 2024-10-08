import { ValidatorFn, Validators } from "@angular/forms";
import { ConstNumbers } from "./ConstNumbers";

export class Constants {
	static readonly NAME = 'name';
	static readonly ID = 'id';
	static readonly TYPE_INPUT = 'input';
	static readonly DESCRIPTION = 'description';

	static readonly OPTION_LIST_FOR_ADMIN_PANEL = ["Article", "Brand", "Category"];

	static readonly FORM_CONFIGURATIONS = new Map<string, Array<FormField>>([
		['brand', [
			{ name: this.NAME, type: this.TYPE_INPUT, validators: [Validators.required, Validators.minLength(ConstNumbers[3]), Validators.maxLength(ConstNumbers[50])] },
			{ name: this.DESCRIPTION, type: this.TYPE_INPUT, validators: [Validators.maxLength(ConstNumbers[255]), Validators.minLength(ConstNumbers[5])] }
		]],
		['category', [
			{ name: 'name', type: this.TYPE_INPUT, validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)] },
			{ name: 'description', type: this.TYPE_INPUT, validators: [Validators.maxLength(255)] }
		]],
		['article', [
			{ name: 'name', type: this.TYPE_INPUT, validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)] },
			{ name: 'description', type: this.TYPE_INPUT, validators: [Validators.required, Validators.maxLength(255)] },
			{ name: 'price', type: this.TYPE_INPUT, validators: [Validators.required] },
			{ name: 'categoryIds', type: this.TYPE_INPUT, validators: [Validators.required] },
			{ name: 'brandId', type: this.TYPE_INPUT, validators: [Validators.required] }
		]]
	]);
}

export interface FormField {
	name: string;
	type: string;
	validators: ValidatorFn[];
	value?: string;
	options?: optValues[];
}

export interface optValues {
	label: string;
	value: string;
}