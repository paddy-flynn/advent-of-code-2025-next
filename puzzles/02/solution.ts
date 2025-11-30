import { Puzzle } from "@/lib/types";
import * as _ from 'lodash';

const parseInput = (input: string): {leftList: number[], rightList: number[]} => {
  const rightList: number[] = []
  const leftList: number[] = []

input.split('\n')
  .forEach(line => {  
    const [left, right] = line.split('   ').map(Number);
    leftList.push(left);
    rightList.push(right);    
  })

  return {leftList, rightList};
};

async function solvePart1(input: string): Promise<number> {
  const {leftList, rightList } = parseInput(input);
  
  leftList.sort((a, b) => a - b);
  rightList.sort((a, b) => a - b);
  
  const result = leftList.reduce((acc, left, index) => {
    return acc + Math.abs(left - rightList[index])
  }, 0);
  
  return result;
}

async function solvePart2(input: string): Promise<number> {
  const {leftList,rightList } = parseInput(input);

  const rightListGrouped =_.countBy(rightList);

  const result = leftList.reduce((acc, left) => {
    const rightCount = rightListGrouped[`${left}`] || 0;  
    return acc + (rightCount * left)
  }, 0)
    
  return result;
}

export default {
  day: "02",
  name: "Historian Hysteria",
  input: "",
  solvePart1,
  solvePart2,
} as Puzzle;
