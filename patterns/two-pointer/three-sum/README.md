# Three Sums

[Problem Link](https://leetcode.com/problems/3sum/)

## Approaches and Solution insights

### Insights

Here are some key things to remember about the solution:

#### Why does the array need to be sorted?

To handle duplicates. Within the input array there are potentially going to be duplicate
numbers, which means that it will be possible for us to generate duplicate triplets if we
find that we are referencing the same set of numbers in the same order as some previous
iteration.

For example, consider the input array [-5, -5, 0, 9, 1, 1, 3, 2, 6, 6, 4, 4]. Our first
pointer is fixed as the first element (-5), while the second and third pointers are at 1,
and -4 respectively. This triplet, [-5, 1, 4], adds up to 0 as we want, but what happens
when we shift the second and third pointers? We get the same permutation of 1 and -4.
Thus, for this iteration, we find that the triplet [-5, 1, 4] is generated twice.
Moreover, an iteration where the second o and third pointers are the same as the previous
iteration is redundant.

Nevertheless, there is a solution to this. We need to find a way of knowing whether the
next iteration will contain the same permutation of pointer values as the current
iteration, that is, in the next iteration, will all three the pointers yield the same
value as the last iteration. This can be done on an unordered sequence, but is terribly
verbose. It is for this reason that we sort the input array, because by doing so we group
duplicates together, making their discovery that much simpler and more efficient: The
algorithm simply becomes checking of the value at the next or previous index is the same
as the current value for that pointer.

#### Why does the while loop need to be nested within the for loop and not the other way around?

Although I am certain there is a more persuasive explanation for this decision. However,
from what I understand, the nesting is done in this way because it is more efficient than
having the for loop nested within the while loop.

Note that when I say _"more efficient,"_ I mean that in a concrete sense. When we have the
while loop being nested, we only every need to iterate from `i + 1` to
`originalArr.length -1`. If we think about that a little, we find that the while loop will
iterate on an increasingly small subset of the original array. But if we were to nest the
for loop within a while loop, the for loop would need to iterate over the entire array for
every iteration of the while loop.

#### Why do we need another while loop within the nested while loop when we find a valid triplet?

This is again, for the avoidance of duplicates. When we find a valid triplet, we must
increment the left pointer and decrement the right pointer for an equal procession among
the array elements. However, what happens if the next value for these pointers are the
same as their previous value? We will get a duplicated triplet. Big no no.

To avoid this we do a bit of pre-processing by comparing the value for **any one of the
pointers** with its next potential value. If they are equal, we skip over that index by
incrementing the pointer. Still, we must also take care to increment the pointer in
question even after we have skipped some duplicate values because whatever loop we use to
fast-track the pointer will stop at the last duplicate value, while we would not want.

```typescript
// ...
while (num[leftInd] === num[leftInd - 1]) leftInd++;

leftInd++;
rightInd--;
/// ...
```

I use the term "**any one of the pointers**" because as long as one pointer references
something different, we overcome the problem of duplicate answers. As an example, [-5, 1,
2], in the context of our problem, is unique triplet relative to [-5, 4, 2].

## Approach

The naive solution would involve a triply nested for loop, but we can optimize that by
using the two-pointer technique to consolidate two of the loops into one. We then get a
problem modeled by the equation `a + b + c = 0`

To be effective, we need to convert the problem into something that can be solved with the
two-pointer approach, something like the two sum problem. Thus, we must break down the
three sum problem into a two sum one. We do this by manipulating the the equational model
of our problem

`a + b + c = 0` becomes `b + c = -a` which is a classical two sum problem
