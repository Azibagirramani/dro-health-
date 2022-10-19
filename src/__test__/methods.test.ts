import { filterFn } from "../util/methods";

const booksData = {
  publisher: "Marvel",
  name: "Game of thrones",
  isbn: "9377-3938739-000",
  released: "09/11/200",
  characters: ["walder", "wick"],
  authors: ["Liam Well"],
  culture: "",
};

describe("utils-methods", () => {
  test("filter-found", () => {
    const searchKey = "walder";
    expect(filterFn(booksData, searchKey)).toBeTruthy();
  });
  test("filter-Not-Found", () => {
    const searchKey = "mark";
    expect(filterFn(booksData, searchKey)).toBeFalsy();
  });
});
