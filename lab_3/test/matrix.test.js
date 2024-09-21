import { expect } from "chai";
import { spy } from "sinon";
import MatrixMock from "../src/matrixMock.js";

describe("Matrix Operations with Mocks", () => {
  let matrixMock;

  beforeEach(() => {
    matrixMock = new MatrixMock(3);
  });

  it("should correctly call mull_add", () => {
    const mullAddSpy = spy(matrixMock, "mull_add");

    matrixMock.mull_add(1, 2, 3);

    expect(mullAddSpy.calledOnce).to.be.true;
    expect(mullAddSpy.calledWith(1, 2, 3)).to.be.true;

    mullAddSpy.restore();
  });

  it("should check for wrong row existence", () => {
    const result = matrixMock.exists_wrong_row();
    expect(result).to.be.false;
  });

  it("should check for zero row existence", () => {
    const result = matrixMock.exists_zero_row();
    expect(result).to.be.true;
  });
});
