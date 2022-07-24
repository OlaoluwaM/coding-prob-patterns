# Product of Array Except Self

[Problem Link](https://leetcode.com/problems/product-of-array-except-self/)

## Approaches

There are two main approaches, but this is contingent on whether we are allowed to use the division operator or not

1. Divide the whole array product by each value when we map
2. Use pre and postfix auxilary arrays

### Approach 1

If we can use the division operator, then things become simpler. We simply need to get the product of all items within the array **beforehand**: `arrayProduct`

After, we map over the array, dividing our product by the current element then returning the value

**Time Complexity**: O(n)
**Space Complexity**: O(1)

### Approach 2

We generate what we call *post* and *prefix* arrays. Both arrays will contain an incrementing product for the elements in the original array.

To illustrate, assume the input array was `[5, 2, 3, 4]`.

- Our *prefix* array would then be `[5, 10, 30, 120]`
- Our *postfix* array would be `[120, 24, 12, 4]`

Once we have established both the prefix and postfix arrays, we iterate through the original array. The product of all element except the current number would then be

```javascript
  prefixArr[indexOfCurrentNum - 1] * postfixArr[indexOfCurrentNum + 1]
```

**Time Complexity**: O(n)
**Space Complexity**: O(n)
