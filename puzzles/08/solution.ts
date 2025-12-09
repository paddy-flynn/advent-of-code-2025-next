import { Puzzle } from "@/lib/types";
import * as _ from 'lodash';

type PointString = string;
type PointPair = [PointString, PointString];
type PairWithDistance = [number, PointString, PointString]; // [distanceSq, pointA, pointB]

const dist = (pointsTuple: PointPair): number => {
  const [p1Str, p2Str] = pointsTuple;
  const [x1, y1, z1] = p1Str.split(',').map((n) => Number(n));
  const [x2, y2, z2] = p2Str.split(',').map((n) => Number(n));

  return (x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2;
};


const runClustering = (points: PointString[], maxEdges: number | undefined = undefined, returnLastPair: boolean = false) => {
  const pairs: PairWithDistance[] = points
    .flatMap((a: PointString, i: number) =>
      points.slice(i + 1).map((b: PointString): PairWithDistance => [dist([a, b]), a, b])
    )
    .toSorted((a, b) => a[0] - b[0]);

  let arr: Set<PointString>[] = [];
  let i: number = 0;
  let lastMergingPair: PointPair | null = null;

  for (const pair of pairs) {
    const [, a, b] = pair;

    const sa: Set<PointString> | undefined = arr.find((s) => s.has(a));
    const sb: Set<PointString> | undefined = arr.find((s) => s.has(b));

    i++;

    if (!!sa && !!sb) {
      if (sa !== sb) {
        arr = arr.filter((s) => s !== sa && s !== sb);
        arr.push(new Set([...sa, ...sb]));
        lastMergingPair = [a, b];
        
        if (returnLastPair && arr.length === 1) {
          return lastMergingPair;
        }
      }
    } else if (!sa && !sb) {
      arr.push(new Set<PointString>([a, b]));
      lastMergingPair = [a, b];
    } else if (sa && !sb) {
      sa.add(b);
      lastMergingPair = [a, b];
    } else if (!sa && sb) {
      sb.add(a);
      lastMergingPair = [a, b];
    }

    if (maxEdges && i === maxEdges) {
      const connectedPoints = new Set<PointString>();
      arr.forEach(cluster => cluster.forEach(p => connectedPoints.add(p)));
      
      points.forEach(p => {
        if (!connectedPoints.has(p)) {
          arr.push(new Set([p]));
        }
      });
      
      arr.sort((setA, setB) => setB.size - setA.size);
      return arr;
    }
  }

  const connectedPoints = new Set<PointString>();
  arr.forEach(cluster => cluster.forEach(p => connectedPoints.add(p)));
  
  points.forEach(p => {
    if (!connectedPoints.has(p)) {
      arr.push(new Set([p]));
    }
  });
  
  arr.sort((setA, setB) => setB.size - setA.size);
  return arr;
};


async function solvePart1(input: string): Promise<number> {
  const points: PointString[] = input.split('\n').filter(p => p.length > 0);
  if (points.length === 0) return 0;

  const arr = runClustering(points, 1000);

  // Calculate the product of the sizes of the top 3 largest clusters
  const result = arr.slice(0, 3).reduce((a, c) => a * c.size, 1);

  return result;
}


async function solvePart2(input: string): Promise<number> {
  const points: PointString[] = input.split('\n').filter(p => p.length > 0);
  if (points.length === 0) return 0;

  const lastPair = runClustering(points, undefined, true) as PointPair;

  const xA: number = Number(lastPair[0].split(',')[0]);
  const xB: number = Number(lastPair[1].split(',')[0]);

  return xA * xB;
}

export default {
  day: "08",
  name: "Playground",
  input: "",
  solvePart1,
  solvePart2,
} as Puzzle;