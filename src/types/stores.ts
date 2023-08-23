import { Page } from 'puppeteer';

export interface Stores {
  [store: string]: (page: Page) => Promise<string>;
}