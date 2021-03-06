import { chromium, Browser } from 'playwright';
import { merge } from 'lodash';
import { IBrowserAndPage, IConstructor, IPost } from './types';
import { defaultConfig } from '../config';
import { LaunchOptions } from 'playwright/types/types';

/**
 * @description FacebookAutomation class.
 */
export class FacebookAutomation {
  private config: IConstructor;

  private static WAIT_IN_MS = 15000;

  /**
   * @description Constructor.
   * @param {IConstructor} config
   */
  constructor(config: IConstructor) {
    this.config = config;
  }

  /**
   * @description Post on the Facebook page.
   * @param {IPost} data
   * @returns {Promise<void>}
   */
  async post(data: IPost): Promise<void> {
    const { page, browser }: IBrowserAndPage = await this.authenticate();

    await page.goto(this.config.pageUrl);

    const createPostSelector = '[aria-label="Create Post"]';

    await page.waitForSelector(createPostSelector);
    await page.click(createPostSelector);

    // Wait on the create post modal"
    await page.waitForSelector('[aria-label="Post"]');
    // Insert directly the text because the focus is already on the input text
    await page.keyboard.insertText(data.text);

    if (data.imagePath) {
      const photo = await page.$('div[role="dialog"] form[method="POST"]');

      // Select an input file
      const input = await photo.$('input[type=file]');
      await input.setInputFiles(data.imagePath);

      await page.waitForTimeout(FacebookAutomation.WAIT_IN_MS);
    }

    // Submit the post
    await page.click('[aria-label="Post"]');

    await page.waitForTimeout(FacebookAutomation.WAIT_IN_MS);

    await this.close(browser);
  }

  /**
   * @description Creates a browser and a page instance.
   * @returns {Promise<IBrowserAndPage>}
   */
  private async createBrowserAndPage(): Promise<IBrowserAndPage> {
    const launchConfiguration: LaunchOptions = merge(
      defaultConfig.defaultBrowserConfiguration,
      this.config.browserConfiguration,
    );

    const browser = await chromium.launch(launchConfiguration);
    const context = await browser.newContext({ permissions: ['camera', 'microphone'] });
    const page = await context.newPage();

    return {
      browser,
      page,
    };
  }

  /**
   * @description Authenticate user from given credentials.
   * @returns {Promise<IBrowserAndPage>}
   */
  private async authenticate(): Promise<IBrowserAndPage> {
    const { page, browser }: IBrowserAndPage = await this.createBrowserAndPage();

    await page.goto(defaultConfig.urls.authentication);
    await page.setViewportSize({ width: 2389, height: 880 });

    const cookieBanner = '[data-cookiebanner="accept_button"]';

    await page.waitForSelector(cookieBanner);
    await page.click(cookieBanner, { delay: 4000 });

    await page.waitForSelector('#email');
    await page.fill('#email', this.config.credentials.login);

    await page.fill('#pass', this.config.credentials.password);
    await page.keyboard.press('Enter', { delay: 1000 });

    await page.waitForTimeout(FacebookAutomation.WAIT_IN_MS);

    return { page, browser };
  }

  /**
   * @description Close browser.
   * @param {Browser} browser
   * @returns {Promise<void>}
   */
  private async close(browser: Browser): Promise<void> {
    return browser.close();
  }
}
