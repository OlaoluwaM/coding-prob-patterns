function longestConsecutive(nums: number[]): number {
  if (nums.length === 0) return 0;

  const numSet = new Set<number>(nums);

  let longestConsecutiveSeq = 0;

  nums.forEach(currentNum => {
    const currentNumIsNotTheFirstNumInASequence = numSet.has(currentNum - 1);
    if (currentNumIsNotTheFirstNumInASequence) return;

    let currentSeqCount = 1;

    while (numSet.has(currentNum + 1)) {
      currentSeqCount += 1;
      currentNum += 1;
    }

    longestConsecutiveSeq = Math.max(longestConsecutiveSeq, currentSeqCount);
  });

  return longestConsecutiveSeq;
}
