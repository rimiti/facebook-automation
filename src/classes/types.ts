import { Page, Browser, LaunchOptions } from 'playwright';

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
