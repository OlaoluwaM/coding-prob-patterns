# Valid Sudoku

  [Problem Link](https://leetcode.com/problems/valid-sudoku/)

## Approaches and Solution insights

### General Insight/Approach

Whenever tasked with removing or discovering duplicates in some problem, look towards data structures like HashMaps and HashSets, alongside a hashing operation that could make it easier to find duplicates in a problem

In particular, this problem has shown us that we can associate these HashMaps and HashSets with the structures we wish to sift through and that hashing comes in many forms like as a key for a HashSet within a HashMap.

Triggers in this problem include:

- A very constrained input size (we only operate on a 9x9 grid), so less time efficient algorithms are feasible
- Looking for duplicates in an array so we know we require Sets
- Multiple arrays so we know we require maps to associate each array with a corresponding Set
- Nested loops to traverse all elements in all arrays
- Usage of arrays

### Problem Specific Insight/Approach

**How'd we figure out the key for the subgrids?**
The hashing algorithm for generating subgrid keys is (`${Math.floor(rowKey / 3)}${Math.floor(columnKey / 3}`). How did we come up with this? Well, if we zoom out, that is, instead of looking at the board as a 9x9, but instead as a 3x3, each cell will represent a subgrid. In this manner, we can compute the key for each subgrid the same way we would for a single cell in the original 9x9 grid: `[rowIndex][columnIndex]`.

But how would we go from a 9x9 to a 3x3 grid? Division. `9/x = 3` -> `9 = 3x` -> `x = 3`, therefore we can calculate a subgrid's row and column indices by dividing the current row and column index by 3. Additionally, because we want only integers, we must round the quotient down, yielding the following algorithm: (`${Math.floor(rowKey / 3)}${Math.floor(columnKey / 3}`)



- **Time Complexity**: O(1), since `n` does not change as it will always be 9. But O(n^2) if `n` was variable
- **Space Complexity**: O(n^2), we create utilize three auxillary structures for keeping track of cell values in a given dimension. Since we enumerate all values within the Sudoku board (n * n values), placing them within structures, they are bound to increase
