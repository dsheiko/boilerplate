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
  rows: any[];
};