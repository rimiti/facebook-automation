import { Page, Browser } from 'playwright';

interface IConstructor {
  credentials: {
    login: string;
    password: string;
  };
  pageUrl: string;
  headless: boolean;
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
