from typing import List


def sortByParity(nums: List[int]) -> List[int]:
    left_ind, right_ind = 0, len(nums) - 1

    while left_ind < right_ind:
        val_at_left_ind: int = nums[left_ind]
        val_at_right_ind: int = nums[right_ind]

        if isEven(val_at_left_ind):
            left_ind += 1
        if isOdd(val_at_right_ind):
            right_ind -= 1
        else:
            nums[left_ind], nums[right_ind] = nums[right_ind], nums[left_ind]
            left_ind += 1
            right_ind -= 1

    return nums


def isOdd(num: int) -> bool:
    return not isEven(num)


def isEven(num: int) -> bool:
    return num % 2 == 0


print(sortByParity([1, 3, 5, 6, 8]))
