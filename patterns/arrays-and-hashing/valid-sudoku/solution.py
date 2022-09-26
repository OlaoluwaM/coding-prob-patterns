from typing import List, Literal, Set
from collections import defaultdict
from math import floor


class Solution:
    def isValidSudoku(self, board: List[List[str]]) -> bool:
        row_list_set_map: defaultdict[int, Set[str]] = defaultdict(set)
        column_list_set_map: defaultdict[int, Set[str]] = defaultdict(set)
        subgrid_list_set_map: defaultdict[str, Set[str]] = defaultdict(set)

        for row_list_index in range(len(board)):
            for column_list_index in range(len(board)):
                subgrid_list_index = self.generate_subgrid_list_key(
                    row_list_index, column_list_index
                )

                current_cell_value: str = board[row_list_index][column_list_index]

                if self.is_empty_cell(current_cell_value):
                    continue

                current_row_list = row_list_set_map[row_list_index]
                current_column_list = column_list_set_map[column_list_index]
                current_subgrid_list = subgrid_list_set_map[subgrid_list_index]

                if (
                    current_cell_value in current_row_list
                    or current_cell_value in current_column_list
                    or current_cell_value in current_subgrid_list
                ):
                    return False

                current_row_list.add(current_cell_value)
                current_column_list.add(current_cell_value)
                current_subgrid_list.add(current_cell_value)

        return True

    def is_empty_cell(self, board_cell: str) -> bool:
        EMPTY_CELL: Literal["."] = "."
        return board_cell == EMPTY_CELL

    def generate_subgrid_list_key(self, row_list_key: int, column_list_key: int) -> str:
        SUBGRID_SIZE: Literal[3] = 3
        return f"[{floor(row_list_key / SUBGRID_SIZE)}][{floor(column_list_key / SUBGRID_SIZE)}]"
