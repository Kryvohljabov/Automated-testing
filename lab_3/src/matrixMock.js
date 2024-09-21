export default class MatrixMock {
  constructor(n) {
    this.rows = n;
    this.cols = n + 1;
    this.matrix = Array.from({ length: n }, () => Array(n + 1).fill(0));
  }

  printm() {
    // Mock implementation, could log or do nothing
  }

  get_rows() {
    return this.rows;
  }

  get_cols() {
    return this.cols;
  }

  mull_add(i, j, d) {
    // Mock behavior could just log the call
    console.log(`mull_add called with i=${i}, j=${j}, d=${d}`);
  }

  exists_wrong_row() {
    // Return a predefined value for testing
    return false;
  }

  exists_zero_row() {
    return true; // Return predefined value for testing
  }

  swap_with_nonzero_row(i) {
    console.log(`swap_with_nonzero_row called for row ${i}`);
  }

  get(i, j) {
    return this.matrix[i][j]; // Return a mock value
  }

  set(i, j, d) {
    this.matrix[i][j] = d; // Mock the set behavior
  }
}
