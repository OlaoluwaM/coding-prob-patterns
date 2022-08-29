# Product of Array Except Self

[Problem Link](https://leetcode.com/problems/product-of-array-except-self/)

## Approaches and Solution insights

There are two main approaches, but this is contingent on whether we are allowed to use the division operator or not

1. Divide the whole array product by each value when we map
2. Use pre and postfix auxiliary arrays

### Approach 1

If we could use the division operator, then things would have been simpler. We simply need to get the product of all items within the array **beforehand**: `arrayProduct`

After, we map over the array, dividing our product by the current element then returning the value

- **Time Complexity**: O(n)
- **Space Complexity**: O(1)

### Approach 2

We generate what we call _post_ and _prefix_ arrays. Both arrays will contain an incrementing product for the elements in the original array.

To illustrate, assume the input array was `[5, 2, 3, 4]`.

- Our _prefix_ array would then be `[5, 10, 30, 120]`
- Our _postfix_ array would be `[120, 24, 12, 4]`

Once we have established both the prefix and postfix arrays, we iterate through the original array. The product of all element except the current number would then be

```javascript
prefixArr[indexOfCurrentNum - 1] * postfixArr[indexOfCurrentNum + 1];
```

- **Time Complexity**: O(n)
- **Space Complexity**: O(n), since we require two auxiliary arrays for both the pre and
  post fix arrays

### Approach 3 **(Most Optimal)**

**TLDR**: Generate a prefix array such that each element is the prefix of the element at the corresponding index within the original array. Then, multiply the prefixes by the postfix of the element at the corresponding index within the original array.

In this this third approach, we layer on top of the second approach using pre and post fix arrays.

Instead of generating both separately then calculation the "product-except-self" values manually, we first generate the prefix array for the original array, then multiple each value within the prefix array with the postfix for the value at the corresponding index in the original array

To illustrate, assume the following array as the original (input) array: `[5, 2, 3, 4]`

We generate the its prefix array. Note that at each index we have the prefix of the value at the corresponding index index in the original array. With our example input, the prefix array would be `[1, 5, 10, 30]`

By default, `1` is the prefix of the first element in the original array. `5` is the prefix of the second element in the original array. `10` is the prefix of the third element in the original array and so no.

Next, we multiply the prefix for each element in the original array by their postfix. With our example input, the final array would be `[24, 60, 40, 30]`. **Note that this multiplication happens from right to left**.

Again, by default `1` is the postfix for the last element in the original array. `40` is the postfix for the second-to-the-last element in the original array. `60` is the postfix for the third-to-last element in the original array and so on.

For the second-to-last element in the original array, here is how we get `40`. Looking at the original array, we see that the postfix for the second-to-last element is `4`.

**We get this by multiplying the postfix of the current element in the original array (postfix of current element is `4`) by the postfix for the previous element in the original array (prefix of prev element is `1`) within the original array**.

Once we have determined the postfix at the target index, we multiply it by the value at the corresponding index within the prefix array (`10`), which will give us the
"product-except-self" value for the target index (the second-to-last index) in the original array.

- **Time Complexity**: O(n)
- **Space Complexity**: O(1) | O(n), depending on whether all calculations are performed
  with the original array or with an auxiliary array
