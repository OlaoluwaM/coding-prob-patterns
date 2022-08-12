function threeSum(nums: number[]): number[][] {
  const sortedNums = nums.sort((a, b) => a - b);
  let outputArr: number[][] = [];

  for (let i = 0; i <= sortedNums.length; i++) {
    const currentNum = sortedNums[i];

    // Thanks to sorting, duplicates are grouped together so this check will do what we want it to do, prevent duplicate
    // values for `currentNum` which couldpotentially yield duplicate values for leftNum and `rightNum`

    if (currentNum === sortedNums[i - 1]) continue;

    let leftInd = i + 1;
    let rightInd = sortedNums.length - 1;

    while (leftInd < rightInd) {
      const leftNum = sortedNums[leftInd];
      const rightNum = sortedNums[rightInd];

      const tripletSum = leftNum + rightNum + currentNum;

      // Wrapped in another araay because .concat will flatten a one-dimension array to its values then add them to the target
      // array, but we would like things to be maintained as an array of arrays

      const currentTriplet = [[leftNum, rightNum, currentNum]];

      if (tripletSum === 0) {
        outputArr = outputArr.concat(currentTriplet);

        while (leftNum === sortedNums[leftInd + 1]) leftInd++;

        leftInd++;
        rightInd--;
      } else if (tripletSum < 0) {
        leftInd++;
      } else rightInd--;
    }
  }

  return outputArr;
}
