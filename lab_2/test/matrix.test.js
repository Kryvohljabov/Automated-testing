import { expect } from "chai";
import { addMatrices, multiplyMatrices } from "../src/matrix_lib/index.js";

describe("Matrix Operations", () => {
  describe("addMatrices", () => {
    it("should add two matrices correctly", () => {
      const a = [
        [1, 2],
        [3, 4],
      ];
      const b = [
        [5, 6],
        [7, 8],
      ];
      const result = addMatrices(a, b);
      expect(result).to.deep.equal([
        [6, 8],
        [10, 12],
      ]);
    });

    it("should throw an error for mismatched dimensions", () => {
      const a = [[1, 2]];
      const b = [[3], [4]];
      expect(() => addMatrices(a, b)).to.throw();
    });
  });

  describe("multiplyMatrices", () => {
    it("should multiply two matrices correctly", () => {
      const a = [
        [1, 2],
        [3, 4],
      ];
      const b = [
        [5, 6],
        [7, 8],
      ];
      const result = multiplyMatrices(a, b);
      expect(result).to.deep.equal([
        [19, 22],
        [43, 50],
      ]);
    });

    it("should throw an error for invalid dimensions", () => {
      const a = [[1, 2, 3]];
      const b = [[4], [5]];
      expect(() => multiplyMatrices(a, b)).to.throw(
        "Invalid matrix dimensions for multiplication",
      );
    });

    it("should handle multiplication with zero matrix", () => {
      const a = [
        [1, 2],
        [3, 4],
      ];
      const b = [
        [0, 0],
        [0, 0],
      ];
      const result = multiplyMatrices(a, b);
      expect(result).to.deep.equal([
        [0, 0],
        [0, 0],
      ]);
    });
  });
});
