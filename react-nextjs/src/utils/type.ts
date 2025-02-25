// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyObject = Record<PropertyKey, any>;

export type SearchParams = {
        pageSize?: number;
        current?: number;
        sortField?: string;
        sortOrder?: string;
        filter?: string;
      };

export type TableData = {
  total: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: any[];
};