// laba_1/test/mtrx.test.js
const { expect } = require("chai");
const Mtrx = require("mtrx");

describe("Mtrx Library Tests", () => {
  it("should correctly multiply two matrices", () => {
    const a = [
      [1, 2],
      [3, 4],
    ];
    const b = [
      [5, 6],
      [7, 8],
    ];
    const expected = [
      [19, 22],
      [43, 50],
    ];
    const result = Mtrx.multiply(a, b);
    expect(result).to.deep.equal(expected);
  });

  it("should throw an error for incompatible matrices", () => {
    const a = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const b = [
      [7, 8],
      [9, 10],
    ];
    expect(() => Mtrx.multiply(a, b)).to.throw();
  });
});
