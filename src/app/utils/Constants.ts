import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ArticleModel } from '../shared/models/ArticleModel';
import { CategoryArticleModel } from '../shared/models/CategoryArticleModel';
import { BrandArticleModel } from '../shared/models/BrandArticleModel';
import { CategoryModel } from '../shared/models/CategoryModel';

export const OPTION_LIST_FOR_ADMIN_PANEL: Array<string> = [
  'Article',
  'Brand',
  'Category',
];

export const Consts = {
  ID: 'id',

  TYPE_INPUT: 'input',
  TYPE_TEXT: 'text',
  TYPE_DATE: 'date',
  TYPE_PASSWORD: 'password',
  TYPE_SELECT: 'select',

  NAME: 'name',
  DESCRIPTION: 'description',
  LAST_NAME: 'last name',
  ID_NUMBER: 'id number',
  PHONE_NUMBER: 'phone number',
  BIRTH_DATE: 'birth date',
  EMAIL: 'email',
  PASSWORD: 'password',

  CATEGORY: 'category',
  CATEGORIES: 'Categories',
  SORT_CATEGORY_NAMES: 'category:name',
  CATEGORY_IDS: 'categoryIds',
  CATEGORY_NAMES: 'Category Names',

  BRAND: 'brand',
  BRAND_ID: 'brandId',
  BRAND_NAME: 'Brand Name',

  ARTICLE: 'article',

  AUX_DEPOT: 'aux-depot',
  AUX_DEPOT_PATH: '/aux-depot',

  PRICE: 'price',
  QUANTITY: 'quantity',

  TEST: 'test',
  CREATED: 'Created',

  DEFAULT_DATE: '2024-06-08',

  BUTTON: 'button',
  SUBMIT: 'submit',
  CUSTOM_TXT: 'Custom txt',
  DEFAULT_BUTTON: 'Default button',

  TEST_ENTITY: 'TestEntity',
  TEST_EMAIL: 'test@email.us',
  TEST_FIELD: 'testField',
  TEST_FIELD_CAPI: 'TestField',
  NON_EXISTED_TYPE: 'nonExistentType',
  TOAST_MESSAGE: 'Toas Message',
  EMPTY: '',
  LABEL: 'label',
  TYPE: 'type',
  SMALL: 'small',
  VALID_VALUE: 'Valid Value',

  BUTTON_SELECTOR: 'app-button',
  HEADER_SELECTOR: 'app-header',
  FORM_SELECTOR: 'app-form-create',

  CREATE_PATH: 'create',
  DASHBOARD_PATH: 'dashboard',
  INVIDIVUAL_DASHBOARD_PATH: 'dashboard/:type',
  REDIRECT_DASHBOARD_PATH: '/dashboard',
  DASHBOARD_CATEGORY_PATH: '/dashboard/category',
  CATEGORIES_PATH: '/categories',
  BY_NAMES_PATH: '/by-names',
  BRAND_PATH: '/brands',
  ARTICLES_PATH: '/articles',

  FALSE: false,
  TRUE: true,

  EMAZON: 'Emazon',
  COMMA_SPACE: ', ',
  COMMA: ',',

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
  TWENTY: 20,
  FIFTY: 50,
  NINETY: 90,
  ONE_HUNDRED_TWENTY: 120,
  THREE_THOUSAND: 3000,

  ERROR_ON_CREATE_ENTITY: 'An error was found while processing createEntity',
  CATEGORIES_NOT_FOUND: 'Some of the categories were not found.',
  BRANDS_NOT_FOUND: 'Brand were not found.',
  FIELD_VALIDATION_ERRORS: 'Request has field validation errors',
  NOT_FOUND_ENTITY: 'No service found for given entity type',

  BIG_DECIMAL_REGEX: /^\d+(?:.\d{1,2})?$/,
  CATEGORIES_REGEX: /^[a-zA-Z]{5,}(?:\s*,\s*[a-zA-Z]{5,})*$/,
  NUMBERS_REGEX: /^\d+$/,
  CHARACTERS_REGEX: /^\w*$/,
  PHONE_NUMBER_REGEX: /^(?:\+?(\d){2})?\d{10}$/,
} as const;

export enum Direcitons {
  ASC = 'asc',
  DESC = 'desc',
}

export type ValidationRules = {
  [key: string]: ValidatorFn[];
};

export interface ValidationConfig {
  brand: ValidationRules;
  category: ValidationRules;
  article: ValidationRules;
  'aux-depot': ValidationErrors;
}

const applyTest = (regex: RegExp, val: string) => {
  if (!regex.test(val)) {
    return { pattern: true };
  }

  return null;
};

const validCategories = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value ? control.value.trim() : '';

  return applyTest(Consts.CATEGORIES_REGEX, value);
};

const isOlderValidator = (
  control: AbstractControl
): ValidationErrors | null => {
  if (!control.value) {
    return null;
  }

  const today = new Date();
  const maxDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );
  const formDate = new Date(control.value);

  return formDate <= maxDate ? null : { isMinor: true };
};

export const Validations: ValidationConfig = {
  brand: {
    name: [
      Validators.required,
      Validators.minLength(Consts.THREE),
      Validators.maxLength(Consts.FIFTY),
    ],
    description: [
      Validators.maxLength(Consts.NINETY),
      Validators.minLength(Consts.FIVE),
      Validators.required,
    ],
  },
  category: {
    name: [
      Validators.required,
      Validators.minLength(Consts.THREE),
      Validators.maxLength(Consts.FIFTY),
    ],
    description: [
      Validators.maxLength(Consts.ONE_HUNDRED_TWENTY),
      Validators.minLength(Consts.FIVE),
      Validators.required,
    ],
  },
  article: {
    name: [
      Validators.required,
      Validators.minLength(Consts.THREE),
      Validators.maxLength(Consts.FIFTY),
    ],
    price: [Validators.required, Validators.pattern(Consts.BIG_DECIMAL_REGEX)],
    quantity: [Validators.required, Validators.pattern(Consts.NUMBERS_REGEX)],
    description: [
      Validators.maxLength(Consts.ONE_HUNDRED_TWENTY),
      Validators.minLength(Consts.FIVE),
      Validators.required,
    ],
    'Category Names': [validCategories],
    'Brand Name': [
      Validators.required,
      Validators.maxLength(Consts.NINETY),
      Validators.minLength(Consts.FIVE),
    ],
  },
  'aux-depot': {
    name: [
      Validators.required,
      Validators.minLength(Consts.THREE),
      Validators.maxLength(Consts.FIFTY),
    ],
    email: [Validators.required, Validators.email],
    password: [Validators.required],
    'last name': [
      Validators.maxLength(Consts.TWENTY),
      Validators.minLength(Consts.THREE),
      Validators.required,
    ],
    'id number': [
      Validators.required,
      Validators.pattern(Consts.NUMBERS_REGEX),
    ],
    'phone number': [
      Validators.required,
      Validators.pattern(Consts.PHONE_NUMBER_REGEX),
    ],
    'birth date': [Validators.required, isOlderValidator],
  },
};

export class Constants {
  static FORM_CONFIGURATIONS = new Map<string, Array<FormField>>([
    [
      'brand',
      [
        { name: Consts.NAME, type: Consts.TYPE_TEXT },
        { name: Consts.DESCRIPTION, type: Consts.TYPE_TEXT },
      ],
    ],
    [
      'category',
      [
        { name: Consts.NAME, type: Consts.TYPE_TEXT },
        { name: Consts.DESCRIPTION, type: Consts.TYPE_TEXT },
      ],
    ],
    [
      'article',
      [
        { name: Consts.NAME, type: Consts.TYPE_TEXT },
        { name: Consts.DESCRIPTION, type: Consts.TYPE_TEXT },
        { name: Consts.PRICE, type: Consts.TYPE_TEXT },
        { name: Consts.QUANTITY, type: Consts.TYPE_TEXT },
        { name: Consts.CATEGORY_NAMES, type: Consts.TYPE_TEXT },
        { name: Consts.BRAND_NAME, type: Consts.TYPE_TEXT },
      ],
    ],
    [
      'aux-depot',
      [
        { name: Consts.NAME, type: Consts.TYPE_TEXT },
        { name: Consts.LAST_NAME, type: Consts.TYPE_TEXT },
        { name: Consts.ID_NUMBER, type: Consts.TYPE_TEXT },
        { name: Consts.PHONE_NUMBER, type: Consts.TYPE_TEXT },
        { name: Consts.BIRTH_DATE, type: Consts.TYPE_DATE },
        { name: Consts.EMAIL, type: Consts.TYPE_TEXT },
        { name: Consts.PASSWORD, type: Consts.TYPE_PASSWORD },
      ],
    ],
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
}

export const categoryArticle1: CategoryArticleModel = {
  id: Consts.ONE,
  name: Consts.NAME,
};

export const category1: CategoryModel = {
  id: Consts.ONE,
  name: Consts.NAME,
  description: Consts.DESCRIPTION,
};

export const category2: CategoryModel = {
  id: Consts.TWO,
  name: Consts.NAME,
  description: Consts.DESCRIPTION,
};

export const brandArticle1: BrandArticleModel = {
  id: Consts.ONE,
  name: Consts.NAME,
  description: Consts.DESCRIPTION,
};

export const article1: ArticleModel = {
  id: Consts.ONE,
  name: Consts.NAME,
  description: Consts.DESCRIPTION,
  price: Consts.ONE_HUNDRED_TWENTY,
  quantity: Consts.TWO,
  updatedAt: new Date(Consts.DEFAULT_DATE),
  categories: [categoryArticle1],
  brand: brandArticle1,
};

export const article2: ArticleModel = {
  id: Consts.ONE,
  name: Consts.NAME,
  description: Consts.DESCRIPTION,
  price: Consts.ONE_HUNDRED_TWENTY,
  quantity: Consts.TWO,
  updatedAt: new Date(Consts.DEFAULT_DATE),
  categories: [categoryArticle1],
  brand: brandArticle1,
};

export enum ToastTypes {
  INFO = 'info',
  SUCCESS = 'success',
  DANGER = 'danger',
}
