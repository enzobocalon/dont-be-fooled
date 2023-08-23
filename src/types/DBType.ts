import { Product, History, Source } from '@prisma/client';

export type ProductType = Product;
export type HistoryType = History;
export type SourceType = Source
export type TableType = (History & {
  source: {
      source: string;
  };
  product: {
      name: string;
  }
})[]
export interface DBType {
  error: boolean,
  message: string | null,
  data: Product | Product[] | History[] | History[] | Source | Source[] | TableType | null,
  pages?: number
}