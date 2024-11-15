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

export enum OnChangesType {
  ENTITY_TYPE = 'entityType',
  ENTITY_NAME = 'entityName',
}

export const Consts = {
  ID: 'id',

  ASC: 'ASC',
  DESC: 'DESC',
  TYPE_INPUT: 'input',
  TYPE_TEXT: 'text',
  TYPE_DATE: 'date',
  TYPE_PASSWORD: 'password',
  TYPE_SELECT: 'select',

  ANY_ROLE: 'any_role',
  TOKEN: 'token',
  DUMMY_TOKEN: 'AKSJFKL;ASLFJAKLJFKLASFJKLASDFJ0924857.',
  ADMIN: 'admin',

  ROLE: 'ROLE_',

  USERNAME: 'username',
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

  BRAND_DASHBOARD: 'Brand dashboard',
  CATEGORY_DASHBOARD: 'Category dashboard',
  ARTICLE_DASHBOARD: 'Article dashboard',

  BRAND: 'brand',
  BRAND_ID: 'brandId',
  BRAND_NAME: 'Brand Name',

  ARTICLE: 'article',

  AUX_DEPOT: 'aux-depot',

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

  LOGIN: 'login',

  SING_UP: 'sign up',
  SINGUP: 'signup',

  CREATE: 'create',
  DASHBOARD: 'dashboard',
  HOME: 'home',
  CART: 'cart',
  CLIENT: 'client',
  OVERVIEW: 'overview',

  AUTH: 'auth',
  SUPPLY_ARTICLE: 'supplyArticle',

  // paths
  CART_PATH: '/cart',
  AUX_DEPOT_PATH: '/aux-depot',
  LOGIN_PATH: '/login',
  CLIENT_PATH: '/client',
  AUTH_LOGIN_PATH: '/auth/login',
  BY_NAMES_PATH: '/by-names',
  BRAND_PATH: '/brands',
  CREATE_ARTICLE_PATH: '/create/article',
  USER_PATH: '/user',
  CART_ID_PATH: '/cartId',
  ARTICLES_PATH: '/articles',
  ARTICLE_ID_PATH: '/articleId',
  SUPPLY_PATH: '/supply',
  CATEGORIES_PATH: '/categories',
  REDIRECT_DASHBOARD_PATH: '/dashboard',
  DASHBOARD_CATEGORY_PATH: '/dashboard/category',
  DASHBOARD_ARTICLE_PATH: '/dashboard/article',
  HOME_PATH: '/home',
  CART_OVERVIEW_PATH: '/cart/overview',

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

  ERROR_ON_CREATE_ENTITY: 'An error was found while creating entity',
  CATEGORIES_NOT_FOUND: 'Some of the categories were not found.',
  BRANDS_NOT_FOUND: 'Brand were not found.',
  FIELD_VALIDATION_ERRORS: 'Request has field validation errors',
  NOT_FOUND_ENTITY: 'No service found for given entity type',
  TYPE_NOT_SUPPORTED: 'Type not supported',
  ERROR_WHILE_LOADING_DATA: 'An error occurred while loading data',
  WRONG_CREDENTIALS: 'Wrong Credentials',
  UNEXPECTED_ERROR: 'Unexpected error',
  UNAUTHORIZED_USER_ERROR: 'U dont have the role to perform this action.',
  BAD_REQUEST_MSG: 'Bad request dummy msg',
  EX_MSG: 'Ex msg',

  BIG_DECIMAL_REGEX: /^\d+(?:.\d{1,2})?$/,
  CATEGORIES_REGEX: /^[a-zA-Z]{3,}(?:\s*,\s*[a-zA-Z]{3,})*$/,
  NUMBERS_REGEX: /^\d+$/,
  POSITIVE_NUMBERS_REGEX: /^[1-9]+$/,
  CHARACTERS_REGEX: /^\w*$/,
  PHONE_NUMBER_REGEX: /^(?:\+?(\d){2})?\d{10}$/,
  PASSWORD_REGEX: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W)(?!.*\s).{7,}$/,
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
  'aux-depot': ValidationRules;
  login: ValidationRules;
  signup: ValidationRules;
  supplyArticle: ValidationRules;
}

const applyTest = (regex: RegExp, val: string) => {
  if (!regex.test(val)) {
    return { pattern: true };
  }

  return null;
};

const isValidPassword = (control: AbstractControl): ValidationErrors | null => {
  const value = control.valid ? control.value : Consts.EMPTY;

  return applyTest(Consts.PASSWORD_REGEX, value);
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
  [Consts.BRAND]: {
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
  [Consts.CATEGORY]: {
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
  [Consts.ARTICLE]: {
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
      Validators.minLength(Consts.THREE),
    ],
  },
  [Consts.AUX_DEPOT]: {
    name: [
      Validators.required,
      Validators.minLength(Consts.THREE),
      Validators.maxLength(Consts.FIFTY),
    ],
    email: [Validators.required, Validators.email],
    password: [isValidPassword],
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
  [Consts.LOGIN]: {
    username: [Validators.required],
    password: [isValidPassword],
  },
  [Consts.SINGUP]: {
    name: [
      Validators.required,
      Validators.minLength(Consts.THREE),
      Validators.maxLength(Consts.FIFTY),
    ],
    email: [Validators.required, Validators.email],
    password: [isValidPassword],
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
  [Consts.SUPPLY_ARTICLE]: {
    quantity: [
      Validators.required,
      Validators.pattern(Consts.POSITIVE_NUMBERS_REGEX),
    ],
  },
};

export class Constants {
  static entityToFormFieldsMap = new Map<string, Array<FormField>>([
    [
      Consts.BRAND,
      [
        { name: Consts.NAME, type: Consts.TYPE_TEXT },
        { name: Consts.DESCRIPTION, type: Consts.TYPE_TEXT },
      ],
    ],
    [
      Consts.CATEGORY,
      [
        { name: Consts.NAME, type: Consts.TYPE_TEXT },
        { name: Consts.DESCRIPTION, type: Consts.TYPE_TEXT },
      ],
    ],
    [
      Consts.ARTICLE,
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
      Consts.AUX_DEPOT,
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
    [
      Consts.LOGIN,
      [
        { name: Consts.USERNAME, type: Consts.TYPE_TEXT },
        { name: Consts.PASSWORD, type: Consts.TYPE_PASSWORD },
      ],
    ],
    [
      Consts.SINGUP,
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
    ['supplyArticle', [{ name: Consts.QUANTITY, type: Consts.TYPE_TEXT }]],
  ]);
}

type tableInfoType = {
  [key: string]: {
    headers: string[];
    clickable: string[];
  };
};

export const TABLE_INFO_BY_ENTITY: tableInfoType = {
  article: {
    headers: [
      'name',
      'description',
      'price',
      'quantity',
      'categories',
      'brand',
    ],
    clickable: ['name', 'categories', 'description'],
  },
  brand: {
    headers: ['name', 'description'],
    clickable: ['name'],
  },
  category: {
    headers: ['name', 'description'],
    clickable: ['name', 'categories', 'description'],
  },
};

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

export enum StatusCodes {
  Unauthorized = 401,
  Forbidden = 403,
  BadRequest = 400,
  Conflict = 409,
  InternalServerError = 500,
}
