import { describe, expect, it } from "vitest";
import { arraysEqual, shuffle } from "../socket/functions/utils";

describe("utils", () => {
  it("arraysEqual", () => {
    const array = [57, 19, 83, 42, 65, 27, 91, 12, 34, 76];
    const newArray = [57, 19, 83, 42, 65, 27, 91, 12, 34, 76];

    expect(arraysEqual(array, newArray)).toBeTruthy();
  });

  it("shuffle", () => {
    const array = [57, 19, 83, 42, 65, 27, 91, 12, 34, 76];
    const newArray = shuffle([57, 19, 83, 42, 65, 27, 91, 12, 34, 76]);

    const sortedArray = [57, 19, 83, 42, 65, 27, 91, 12, 34, 76];
    sortedArray.sort((a, b) => a - b);

    const sortedNewArray = [...newArray];
    sortedNewArray.sort((a, b) => a - b);

    expect(
      array !== newArray && arraysEqual(sortedArray, sortedNewArray),
    ).toBeTruthy();
  });
});
