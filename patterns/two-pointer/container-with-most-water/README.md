  # Container With Most Water

  [Problem Link](https://leetcode.com/problems/container-with-most-water/)

  ## Approaches and Solution insights

  ### Insights

  1. The area we desire is gotten using the following equation `min(leftNum, rightNum) * (left_ind - rightInd)`. We get the minimum of `rightNum` and `leftNum` 
     because a container in reality will only hold water up to its height of its smallest side. Anymore than that and it will overflow

  2. Since we are looking for the max, one way of thinking about pointer movement would be to always shift the pointer referencing the smaller number. I believe this would increase the chances
     of use finding our max container size
