import { useState, useEffect } from "react";
import { baseUrl } from "./apiConstants";

import { GetBooksApi } from "./books";
import { GetCharactersApi } from "./character";

import type { IBooks } from "../types";

// => Date Time format
export const dateTimeFormat = (data: string | number | Date) => {
  return new Date(data).toLocaleTimeString([], {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// -> Bundle all request
export function PreparePromise(): Promise<[Response, Response]> {
  const books = GetBooksApi(baseUrl);
  const characters = GetCharactersApi(baseUrl);
  return Promise.all([books, characters]);
}

// -> Fetch and Manage data
export default function useAsyncPromise(): [
  data: IBooks[],
  error: string | undefined,
  isLoading: boolean
] {
  const [data, setData] = useState<IBooks[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const makeRequest = async () => {
      let toJson: any = [];
      setIsLoading(true);
      try {
        const data = await PreparePromise();

        for (let i = 0; i < data.length; i++) {
          const raw = await data[i].json();
          toJson.push(raw);
        }

        let booksData: IBooks[] = [];
        const booksApiData = toJson[0]; // _Books data from Promise Array
        const characterApiData = toJson[1]; // _Characters data from Promise Array

        for (
          let booksIndex = 0;
          booksIndex < booksApiData.length;
          booksIndex++
        ) {
          let charactersFound = [];
          let foundCulture = "";
          for (
            let characterListIndex = 0;
            characterListIndex < booksApiData[booksIndex].characters.length;
            characterListIndex++
          ) {
            for (
              let characterIndex = 0;
              characterIndex < characterApiData.length;
              characterIndex++
            ) {
              if (
                booksApiData[booksIndex].characters[characterListIndex] ===
                characterApiData[characterIndex].url
              ) {
                charactersFound.push(characterApiData[characterIndex].name);
                foundCulture = characterApiData[characterIndex].culture;
              }
            }
          }

          booksData.push({
            publisher: booksApiData[booksIndex].publisher,
            name: booksApiData[booksIndex].name,
            isbn: booksApiData[booksIndex].isbn,
            released: dateTimeFormat(booksApiData[booksIndex].released),
            characters: charactersFound,
            authors: booksApiData[booksIndex].authors,
            culture: foundCulture,
            numberOfPages: booksApiData[booksIndex].numberOfPages,
            country: booksApiData[booksIndex].country,
            mediaType: booksApiData[booksIndex].mediaType,
          });
        }
        setData(booksData);
        console.log(booksData);
      } catch (error) {
        setError(error as string);
      } finally {
        setIsLoading(false);
      }
    };
    makeRequest();
  }, []);

  return [data, error, isLoading];
}
