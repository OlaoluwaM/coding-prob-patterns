type Board = string[][];

const BOARD_SIZE = 9;
const EMPTY_CELL = '.';
const SUB_GRID_SIZE = 3;

function isValidSudoku(board: Board): boolean {
  const hasValidRows = areRowsValid(board);
  const hasValidColumns = areBoardColumnsValid(board);
  const hasValidSubGrids = areAllBoardSubGridsValid(board);

  return hasValidRows && hasValidColumns && hasValidSubGrids;
}

function areRowsValid(board: Board): boolean {
  return board.map(normalizeRow).every(row => new Set<string>(row).size === row.length);
}

function normalizeRow(row: string[]): string[] {
  return row.filter(val => val !== EMPTY_CELL);
}

function areBoardColumnsValid(board: Board): boolean {
  for (let boardColumnIndex = 0; boardColumnIndex < BOARD_SIZE; boardColumnIndex++) {
    let boardColumn: string[] = [];
    const setForCurrentBoardColumn = new Set<string>();

    for (
      let boardColumnElemIndex = 0;
      boardColumnElemIndex < BOARD_SIZE;
      boardColumnElemIndex++
    ) {
      const columnElem = board[boardColumnElemIndex][boardColumnIndex];
      if (isEmptyCell(columnElem)) continue;

      setForCurrentBoardColumn.add(columnElem);
      boardColumn.push(columnElem);
    }

    if (setForCurrentBoardColumn.size !== boardColumn.length) {
      return false;
    }
  }

  return true;
}

function isEmptyCell(elem: string) {
  return elem === EMPTY_CELL;
}

function areAllBoardSubGridsValid(board: Board): boolean {
  const boardSubGridIntervals = [0, 3, 6];

  for (let subGridIndex = 0, j = 0; subGridIndex < BOARD_SIZE; subGridIndex++) {
    if (subGridIndex > 0 && subGridIndex % 3 === 0) j++;
    let boardSubGrid: string[] = [];

    for (let subGridRowIndex = 0; subGridRowIndex < SUB_GRID_SIZE; subGridRowIndex++) {
      const subGridRowIndexOffset = boardSubGridIntervals[j];
      const subGridRow = board[subGridRowIndex + subGridRowIndexOffset];

      const subGridRowStartingElemIndexOffset =
        boardSubGridIntervals[subGridIndex % SUB_GRID_SIZE];
      const subGridRowLastElemIndex = SUB_GRID_SIZE + subGridRowStartingElemIndexOffset;

      const subGridRowValues = subGridRow.slice(
        subGridRowStartingElemIndexOffset,
        subGridRowLastElemIndex
      );

      boardSubGrid = boardSubGrid.concat(normalizeRow(subGridRowValues));
    }

    const uniqueSubGridSet = new Set<string>(boardSubGrid);
    if (uniqueSubGridSet.size !== boardSubGrid.length) {
      return false;
    }
  }

  return true;
}

// Alternate solution (Using maps and sets)

function isValidSudokuAlt(board: string[][]): boolean {
  const BOARD_SIZE = 9;

  const rows = new Map<number, Set<string>>();
  const columns = new Map<number, Set<string>>();
  const subGrids = new Map<string, Set<string>>();

  for (let rowKey = 0; rowKey < BOARD_SIZE; rowKey++) {
    for (let columnKey = 0; columnKey < BOARD_SIZE; columnKey++) {
      const subGridKey = generateSubGridKey(rowKey, columnKey);

      const currentNum = board[rowKey][columnKey];
      if (isEmptyCellAlt(currentNum)) continue;

      if (!rows.has(rowKey)) rows.set(rowKey, new Set<string>());
      if (!columns.has(columnKey)) columns.set(columnKey, new Set<string>());
      if (!subGrids.has(subGridKey)) subGrids.set(subGridKey, new Set<string>());

      if (
        rows.get(rowKey)!.has(currentNum) ||
        columns.get(columnKey)!.has(currentNum) ||
        subGrids.get(subGridKey)!.has(currentNum)
      ) {
        return false;
      }

      rows.get(rowKey)!.add(currentNum);
      columns.get(columnKey)!.add(currentNum);
      subGrids.get(subGridKey)!.add(currentNum);
    }
  }

  return true;
}

function generateSubGridKey(rowKey: number, columnKey: number): string {
  const SUB_GRID_SIZE = 3;
  return `${Math.floor(rowKey / SUB_GRID_SIZE)}${Math.floor(columnKey / SUB_GRID_SIZE)}`;
}

function isEmptyCellAlt(cell: string): boolean {
  const EMPTY_CELL = '.';
  return cell === EMPTY_CELL;
}
