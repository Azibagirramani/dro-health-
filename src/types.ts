export type IBooks = {
  publisher: string;
  name: string;
  isbn: string;
  released: string;
  characters: string[];
  authors: string[];
  culture: string;
  numberOfPages?: number;
  country?: string;
  mediaType?: string;
};

export type IField = {
  label: string;
  key: string;
  className?: string;
};

export type ITable = {
  fields: IField[];
  rows: IBooks[];
  TableLoading: boolean;
};
