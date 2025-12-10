import { Puzzle } from "@/lib/types";

interface Point {
  x: number;
  y: number;
}

const parseInput = (input: string): Point[] => {
  return input.split('\n').map(line => {
    const [x, y] = line.split(',').map(Number);
    return { x, y };
  });
}

function getRectangleArea(p1: Point, p2: Point): number {
  const width = Math.abs(p2.x - p1.x) + 1;
  const height = Math.abs(p2.y - p1.y) + 1;
  return width * height;
}

async function solvePart1(input: string): Promise<number> {
  const points = parseInput(input);

  let maxArea = 0;
  for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < points.length; j++) {
      if (i === j) continue;
      
      const area = getRectangleArea(points[i], points[j]);
      maxArea = Math.max(maxArea, area);
    }
  }
  return maxArea;
}

function arePointsInSameQuadrant(p1: Point, p2: Point, midX: number, midY: number): boolean {
  const p1Left = p1.x < midX;
  const p2Left = p2.x < midX;
  const p1Top = p1.y < midY;
  const p2Top = p2.y < midY;
  
  return (p1Left === p2Left) && (p1Top === p2Top);
}

function hasDotsOrLinesInside(p1: Point, p2: Point, points: Point[]): boolean {
  const minX = Math.min(p1.x, p2.x);
  const maxX = Math.max(p1.x, p2.x);
  const minY = Math.min(p1.y, p2.y);
  const maxY = Math.max(p1.y, p2.y);

  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    
    if (point.x > minX && point.x < maxX && point.y > minY && point.y < maxY) {
      return true;
    }

    const nextPoint = points[(i + 1) % points.length];
    
    if (point.x === nextPoint.x) {
      const lineX = point.x;
      const lineMinY = Math.min(point.y, nextPoint.y);
      const lineMaxY = Math.max(point.y, nextPoint.y);
      
      if (lineX > minX && lineX < maxX && lineMinY < maxY && lineMaxY > minY) {
        return true;
      }
    }
    
    if (point.y === nextPoint.y) {
      const lineY = point.y;
      const lineMinX = Math.min(point.x, nextPoint.x);
      const lineMaxX = Math.max(point.x, nextPoint.x);
      
      if (lineY > minY && lineY < maxY && lineMinX < maxX && lineMaxX > minX) {
        return true;
      }
    }
  }
  
  return false;
}

async function solvePart2(input: string): Promise<number> {
  const points = parseInput(input);
  
  const minX = Math.min(...points.map(p => p.x));
  const maxX = Math.max(...points.map(p => p.x));
  const minY = Math.min(...points.map(p => p.y));
  const maxY = Math.max(...points.map(p => p.y));
  
  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  
  let maxArea = 0;
  
  for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < points.length; j++) {
      if (i === j) continue;
      
      const p1 = points[i];
      const p2 = points[j];
      
      if (arePointsInSameQuadrant(p1, p2, midX, midY)) continue;
      
      const area = getRectangleArea(p1, p2);
      
      if (area > maxArea && !hasDotsOrLinesInside(p1, p2, points)) {
        maxArea = area;
      }
    }
  }
  
  return maxArea;
}

export default {
  day: "09",
  name: "Movie Theater",
  input: "",
  solvePart1,
  solvePart2,
} as Puzzle;
