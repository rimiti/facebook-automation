import { Page, Browser } from 'playwright';
import { LaunchOptions } from 'playwright/types/types';

interface IConstructor {
  credentials: {
    login: string;
    password: string;
  };
  pageUrl: string;
  browserConfiguration?: LaunchOptions;
}

interface IPost {
  text: string;
  imagePath?: string;
}
interface IBrowserAndPage {
  browser: Browser;
  page: Page;
}

export { IPost, IConstructor, IBrowserAndPage };
