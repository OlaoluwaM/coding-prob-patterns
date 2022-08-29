# Group Anagrams

[Problem Link](https://leetcode.com/problems/group-anagrams/)

## Approaches and Solution insights

### General Insight

For a string to be an anagram of another string it MUST meet the following requirements:

1. Have the same length as the original string
2. Have the same permutation of characters as the original string.

### General Approach

We will need to transform each array element into some useful representation that will
allow us to easily perform comparisons to find the anagrams. Here are some:

1. We can sort each string. Sorting anagrams will produce the same string, e.g sorting
   `"ate"` and `"eat"` will yield `"aet"` in both cases since both are anagrams of each
   other

   - **Time Complexity**: O(n log n), with n being the length of the longest string and
     assuming we are using an efficient sorting algorithm
   - **Space Complexity**: O(n), linear time because we still need to collect anagrams
     into a hash table

2. More optimally we can hash each string based on both length and character permutation
   such that two strings of the same length and character permutation will yield the same
   hash value. A good example of such a hashing algorithm would look like this, for any
   given string:

   1. Generate an array of zeros with a length equal to the number of characters in the
      alphabet
   2. Iterate through that character frequency array, incrementing the frequency as needed
      for each character in the string
   3. Convert that updated frequency array into a string delimited by some non-numeric
      character like a hashtag `"#"`

      - **Time Complexity**: O(n)
      - **Space Complexity**: O(n), linear time because we still need to collect anagrams
        into a hash table

With above representation satisfied, we can then perform simple equality comparisons to
determine whether two string are anagrams of one another. We can then collect the result
of the comparisons into a Map/Object for expressiveness.
