# Top K Frequent Elements

[Problem Link](https://leetcode.com/problems/top-k-frequent-elements/)

## Approaches and Solution insights

### General insight

For all approaches we would need to compute a frequency map that relates each unique element to its frequency in the input array

### Approach 1

This would be what I consider the brute force approach as it is the most intuitive.

1. we generate a frequency map from the elements within the initial array.
2. We filter the original array removing all duplicates.
3. We use the frequency map to sort the unique elements in order of...frequency
4. We get the *k* most frequent elements by slicing the unique sorted array from the indexes `0` to `k`.

- **Time Complexity**: O(n log n), since we are sorting by frequency, assuming that the sort algorithm used is efficient
- **Space Complexity**: O(n), we create two auxiliary structures, a frequency map and a unique array, from the original array. The size of both linearly depends on the size of the original array

### Approach 2 **(Preferred approach, more efficient)**

This approach is based on the bucket sort algorithm, but makes use of it in part. Let me explain:

1. We create an array of arrays with each inner array representing a bucket which in turn represents some frequency. For instance, the following `[[], [], []]` represents three bucket. The bucket at index `0` would house all those elements in the original array that have a frequency of 1, while the second bucket at index `1` would house all those elements in the original array that have a frequency of 2 and so on. Essentially, the frequency represented by each bucket can be calculated as `bucketIndex + 1`
   1. **Note that by using this structure we can only have, at most, `n` buckets, with `n` being the length of the input array.**
2. We then iterate through the input array generating a frequency map for each unique element within the input array
3. We utilize this frequency map to fill out our array of buckets, assigning each unique element to their corresponding bucket based on their frequency
4. Finally, we iterate, from the end, through the buckets array retrieving the unique input array elements within until we retrieve up to `k` unique elements.

- **Time Complexity**: O(n), no sorting *yayyy*, only linear iteration
- **Space Complexity**: O(n), we are still creating auxiliary structures whose size is contingent on the size of the input array: the frequency map and the buckets array
