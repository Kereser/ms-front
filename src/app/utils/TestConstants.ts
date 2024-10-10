export class TestConstants {
    static readonly CREATE_BRAND = 'Create Brand';
	static readonly CREATE_CATEGORY = 'Create Category';
	static readonly CREATE_ARTICLE = 'Create Article';

    static readonly BRAND = 'brand';
	static readonly CATEGORY = 'category';
	static readonly ARTICLE = 'article';


    static readonly	EMAZON = 'Emazon';

    static readonly CREATE_PATH = 'create/:type';
    static readonly CREATE_CATEGORY_PATH = '/create/category';
    static readonly CREATE_BRAND_PATH = '/create/brand';
    static readonly CREATE_ARTICLE_PATH = '/create/article';
    static readonly TYPE = ':type'
	static readonly DASHBOARD_PATH = 'dashboard';
	static readonly REDIRECT_DASHBOARD_PATH = '/dashboard';

    static readonly NAVIGATE_BY_URL = 'navigateByUrl';

    static readonly UNSUBSCRIBE = 'unsubscribe';
    static readonly TEST_TYPE = 'test-type';

    static readonly 0 = 0;
    static readonly 1 = 1;
    static readonly 2 = 2;
    static readonly 3 = 3;

    public static capitalize(str: string):string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}