export function addMatrices(a, b) {
  if (a.length !== b.length || a[0].length !== b[0].length) {
    throw new Error("Matrices must have the same dimensions");
  }
  return a.map((row, i) => row.map((value, j) => value + b[i][j]));
}

export function multiplyMatrices(a, b) {
  const aRows = a.length;
  const aCols = a[0].length;
  const bRows = b.length;
  const bCols = b[0].length;

  // Check if multiplication is possible (aCols must equal bRows)
  if (aCols !== bRows) {
    throw new Error("Invalid matrix dimensions for multiplication");
  }

  // Initialize the result matrix with zeros
  const result = Array.from({ length: aRows }, () => Array(bCols).fill(0));

  // Perform multiplication
  for (let i = 0; i < aRows; i++) {
    for (let j = 0; j < bCols; j++) {
      for (let k = 0; k < aCols; k++) {
        result[i][j] += a[i][k] * b[k][j];
      }
    }
  }

  return result;
}
