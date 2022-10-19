import { IBooks } from "../types";

export const filterFn = (items: IBooks, searchKey: string) => {
  return (
    items.characters.some((x: string) =>
      x.toLowerCase().includes(searchKey.toLowerCase())
    ) ||
    items.authors.some((x: string) =>
      x.toLowerCase().includes(searchKey.toLowerCase())
    ) ||
    items.publisher?.toLowerCase().includes(searchKey.toLowerCase()) ||
    items.name?.toLowerCase().includes(searchKey.toLowerCase()) ||
    items.isbn?.toLowerCase().includes(searchKey.toLowerCase()) ||
    items.released?.toLowerCase().includes(searchKey.toLowerCase()) ||
    items.culture?.toLowerCase().includes(searchKey.toLowerCase())
  );
};
