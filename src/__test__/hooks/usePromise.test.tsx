import { renderHook, act, screen, render } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import "@testing-library/jest-dom";

import AsyncPromise, { PreparePromise } from "../../api/usePromise";
import AppEntry from "../../App";

fetchMock.enableMocks();

describe("usePromise", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test("Expect PreparePromise return array of Promise", async () => {
    await PreparePromise();
    expect(fetchMock.mock.calls.length).toEqual(2);
  });
  test("initial-value-check", async () => {
    const promise = Promise.resolve();
    const { result } = renderHook(() => AsyncPromise());
    const [data, error, isLoading] = result.current;
    render(<AppEntry />);
    await act(async () => {
      await promise;
    });
    expect(data).toEqual([]);
    expect(error).toBe(undefined);
    expect(isLoading).toBe(true);
  });
});
