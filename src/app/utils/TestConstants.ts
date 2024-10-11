export class TestConstants {
	static readonly CREATE_BRAND = 'Create Brand';
	static readonly CREATE_CATEGORY = 'Create Category';
	static readonly CREATE_ARTICLE = 'Create Article';

	static readonly BRAND = 'brand';
	static readonly CATEGORY = 'category';
	static readonly ARTICLE = 'article';

	static readonly EMAZON = 'Emazon';

	static readonly CREATE_PATH = 'create/:type';
	static readonly CREATE_CATEGORY_PATH = '/create/category';
	static readonly CREATE_BRAND_PATH = '/create/brand';
	static readonly CREATE_ARTICLE_PATH = '/create/article';
	static readonly TYPE = ':type'
	static readonly DASHBOARD_PATH = 'dashboard';
	static readonly REDIRECT_DASHBOARD_PATH = '/dashboard';

	static readonly UNSUBSCRIBE = 'unsubscribe';
	static readonly TEST_TYPE = 'test-type';

	public static capitalize(str: string): string {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
}

export const Constants = {
	ZERO: 0,
	ONE: 1,
	TWO: 2,
	THREE: 3,
	SIX: 6,

	EMIT: 'emit',
}

export enum TestUtilEnums {
	NAVIGATE_BY_URL = 'navigateByUrl',
	CREATE_BRAND = 'Create Brand',
	CREATE_CATEGORY = 'Create Category',
	CREATE_ARTICLE = 'Create Article',

	EMIT = 'emit',
	CLICK = 'click',
	OPTION_2 = 'Option2',
	OPTION_1 = 'Option1',
	OPTION_3 = 'Option3,'
}