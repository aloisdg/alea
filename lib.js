//The maximum is inclusive and the minimum is 1
const roll = (max) => Math.floor(Math.random() * max + 1);
const forceSymbol = (n) => (n < 0 ? n : `+${n}`);
const range = (start, count) =>
  new Array(count).fill(0).map((_, i) => start + i);
const repeat = (count, f) => new Array(count).fill(0).map((_) => f());
const sum = (list) => list.reduce((a, b) => a + b, 0);
