# Trapping Rain Water

[Problem Link](https://leetcode.com/problems/trapping-rain-water/)

## Approaches and Solution insights

### Insights

1. **How do we know that using the two-pointer technique should work**:

   1. The problem input is an array
   2. The key term of the problem is **trapping.** Since we are working on a two
      dimensional array, the requirements for trapping are two boundaries. Meaning we will
      need to find two boundaries (heights) in the array to directly or indirectly compute
      our answer

2. The process of **trapping** is a bit more involved than simply having two boundaries
   because we need to know the amount of water trappable between any two boundaries. This
   can be calculated using the following formula
   `Math.min(leftHeight, rightHeight) - heights[currInd]`. Lets break this down into two,
   the left and right operand

   1. `Math.min(leftHeight, rightHeight)` simply represents the fact that for any given
      boundary we cannot store more than the height of the shortest boundary. Any more
      than that will result in an overflow
   2. For the right operand,`height[currInd]`, take the following height configuration
      `[3, 0, 5]`. Here all we need to is substract 0 from 3, but what happens if we had
      `[3, 2, 5]`, then the amount of water trappable would be hindered by the height of
      two within the boundary, and in order to cater for that hinderance, we need to
      subtract its height.

3. **How are the pointers arranged?**: Opposite sides, moving at the same speed

### Approaches

There exists multiple ways to implement a solution for this problem, but the most
efficient solution would be the two pointers solution with a linear time complexity and a
constant space complexity.

Nevertheless, other solutions like the nested array, dynamic programming, or stack-based
solutions still exist.

### Write these properly later

For any given height we need to find the maximum boundary on both sides

We find the maximum boundaires because we are trying to compute the maximum amount of
water trappable

Since we are searching for the maximum boundaires, we always move the pointer away from
the smaller boundary

We kwwp track of the largest boundary found at both sides of the array
