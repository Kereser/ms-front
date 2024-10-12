import { ValidatorFn, Validators } from "@angular/forms";
import { ArticleModel } from "../shared/models/ArticleModel";
import { CategoryArticleModel } from "../shared/models/CategoryArticleModel";
import { BrandArticleModel } from "../shared/models/BrandArticleModel";
import { CategoryModel } from "../shared/models/CategoryModel";


export const OPTION_LIST_FOR_ADMIN_PANEL: Array<string> = ["Article", "Brand", "Category"];

export const Consts = {
	NAME: 'name',
	NAME_CAPI: 'Name',
	ID: 'id',
	TYPE_INPUT: 'input',
	TYPE_SELECT: 'select',
	DESCRIPTION: 'description',
	DESCRIPTION_CAPI: 'Description',
	CATEGORY: 'category',
	CATEGORIES: 'Categories',
	BRAND: 'Brand',
	ARTICLE: 'Article',
	BRAND_NAME: 'Brand name',
	PRICE: 'Price',

	TEST: 'test',
	CREATED: 'Created',
	
	DEFAULT_DATE: '2024-06-08',

	BUTTON: 'button',
	DEFAULT_BUTTON: 'Default button',

	TEST_ENTITY: 'TestEntity',
	TEST_FIELD: 'testField',
	TEST_FIELD_CAPI: 'TestField',
	NON_EXISTED_TYPE: 'nonExistentType',

	BUTTON_SELECTOR: 'app-button',
	HEADER_SELECTOR: 'app-header',
	FORM_SELECTOR: 'app-form-create',

	CREATE_PATH: 'create/:type',
	DASHBOARD_PATH: 'dashboard',
	INVIDIVUAL_DASHBOARD_PATH: 'dashboard/:type',
	REDIRECT_DASHBOARD_PATH: '/dashboard',
	CATEGORIES_PATH: '/categories',
	BRAND_PATH: '/brands',
	ARTICLES_PATH: '/articles',
	
	EMPTY: '',
	LABEL: 'label',
	TYPE: 'type',
	SMALL: 'small',
	VALID_VALUE: 'Valid Value',
	
	FALSE: false,
	TRUE: true,

	EMAZON: 'Emazon',
	COMMA_SPACE: ', ',

	ZERO: 0,
	ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
  SIX: 6,
  SEVEN: 7,
  EIGHT: 8,
  NINE: 9,
  TEN: 10,
	FIFTY: 50,
  NINETY: 90,
  ONE_HUNDRED_TWENTY: 120,
	THREE_THOUSAND: 3000,

	ERROR_ON_CREATE_ENTITY: 'An error was found while processing createEntity',
}

export enum Direcitons {
	ASC = 'asc',
	DESC = 'desc'
}

export type ValidationRules = {
  [key: string]: ValidatorFn[];
};

export interface ValidationConfig {
  brand: ValidationRules;
  category: ValidationRules;
  article: ValidationRules;
}

export const categoryColumnDefault = Consts;

export const Validations: ValidationConfig = {
	brand: {
		name: [Validators.required, Validators.minLength(Consts.THREE), Validators.maxLength(Consts.FIFTY)],
		description: [Validators.maxLength(Consts.NINETY), Validators.minLength(Consts.FIVE), Validators.required]
	},
	category: {
		name: [Validators.required, Validators.minLength(Consts.THREE), Validators.maxLength(Consts.FIFTY)],
		description: [Validators.maxLength(Consts.ONE_HUNDRED_TWENTY), Validators.minLength(Consts.FIVE), Validators.required]
	},
	article: {
		name: [Validators.required, Validators.minLength(Consts.THREE), Validators.maxLength(Consts.FIFTY)],
		description: [Validators.maxLength(Consts.ONE_HUNDRED_TWENTY), Validators.minLength(Consts.FIVE), Validators.required],
		price: [Validators.required],
		categories: [Validators.required, Validators.minLength(Consts.ONE), Validators.maxLength(Consts.THREE)],
		brand: [Validators.required]
	}
}

export class Constants {

	static FORM_CONFIGURATIONS = new Map<string, Array<FormField>>([
		['brand', [
			{ name: Consts.NAME, type: Consts.TYPE_INPUT },
			{ name: Consts.DESCRIPTION, type: Consts.TYPE_INPUT }
		]],
		['category', [
			{ name: Consts.NAME, type: Consts.TYPE_INPUT },
			{ name: Consts.DESCRIPTION, type: Consts.TYPE_INPUT}
		]],
		['article', [
			{ name: Consts.NAME, type: Consts.TYPE_INPUT},
			{ name: Consts.DESCRIPTION, type: Consts.TYPE_INPUT},
			{ name: Consts.PRICE, type: Consts.TYPE_INPUT},
			{ name: 'categoryIds', type: Consts.TYPE_INPUT},
			{ name: 'brandId', type: Consts.TYPE_INPUT}
		]]
	]);
}

export interface EntityFields {
	name: string;
	type: string;
}

export interface FormField {
	name: string;
	type: string;
	value?: string;
	options?: optValues[];
}

export interface optValues {
	label: string;
	value: string;
}

export const categoryArticle1: CategoryArticleModel = {
	id: Consts.ONE, name: Consts.NAME
}

export const category1: CategoryModel = {
	id: Consts.ONE, name: Consts.NAME, description: Consts.DESCRIPTION
}

export const category2: CategoryModel = {
	id: Consts.TWO, name: Consts.NAME, description: Consts.DESCRIPTION
}

export const brandArticle1: BrandArticleModel = {
	id: Consts.ONE, name: Consts.NAME, description: Consts.DESCRIPTION
}

export const article1: ArticleModel = {
	id: Consts.ONE, 
	name: Consts.NAME, 
	description: Consts.DESCRIPTION, 
	price: Consts.ONE_HUNDRED_TWENTY, 
	quantity: Consts.TWO, 
	updatedAt: new Date(Consts.DEFAULT_DATE), 
	categories: [categoryArticle1], 
	brand: brandArticle1 
}

export const article2: ArticleModel = {
	id: Consts.ONE, 
	name: Consts.NAME, 
	description: Consts.DESCRIPTION, 
	price: Consts.ONE_HUNDRED_TWENTY, 
	quantity: Consts.TWO, 
	updatedAt: new Date(Consts.DEFAULT_DATE), 
	categories: [categoryArticle1], 
	brand: brandArticle1 
}

export enum ToastTypes {
  INFO = 'info',
  SUCCESS = 'success',
  DANGER = 'danger',
}