import { expect } from "chai";
import Mtrx from "mtrx";

describe("Mtrx Library Tests", () => {
  it("should correctly multiply two matrices", () => {
    const a = new Mtrx([
      [1, 2],
      [3, 4],
    ]);

    const b = new Mtrx([
      [5, 6],
      [7, 8],
    ]);

    const expected = new Mtrx([
      [19, 22],
      [43, 50],
    ]);

    const result = Mtrx.mul(a, b);

    expect(Mtrx.equalAll(result, expected)).equal(true);
  });

  it("should throw an error for incompatible matrices", () => {
    const a = new Mtrx([
      [1, 2, 3],
      [4, 5, 6],
    ]);
    const b = new Mtrx([
      [7, 8],
      [9, 10],
    ]);

    expect(() => a.mul(b)).to.throw();
  });
});
