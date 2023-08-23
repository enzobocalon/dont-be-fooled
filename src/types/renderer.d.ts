import { DBType } from './DBType';

export interface IElectronAPI {
  scrap: {
    start: () => void;
  }
  prisma: {
    createProducts: (name: string, image: string) => Promise<DBType>,
    loadProducts: () => Promise<DBType>,
    createSources: (id: string, url: string) => Promise<DBType>,
    loadScrapDate: () => Promise<Date>,
    loadSources: () => Promise<DBType>,
    loadFeaturedProduct: () => Promise<DBType>,
    loadHistoryFeaturedProduct: (id: string) => Promise<DBType>,
    createFeaturedProduct: (id: string) => Promise<DBType>,
    loadHistory: (page: number) => Promise<DBType>,
    loadHistoryById: (id: string, page: number) => Promise<DBType>,
    loadFeaturedProductHistoryFromLastWeek: () => Promise<DBType>
  },
  receive: (channel: string, cb: (data: string) => void) => () => void
  openLink: (link: string) => void
}

declare global {
  interface Window {
    services: IElectronAPI
  }
}