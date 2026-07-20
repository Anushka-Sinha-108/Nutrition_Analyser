export type ServingSize =
  | 'skip'
  | 'half'
  | 'full'
  | 'oneAndHalf'
  | 'double';

export const servingMultipliers: Record<ServingSize, number> = {
  skip: 0,
  half: 0.5,
  full: 1,
  oneAndHalf: 1.5,
  double: 2,
};

export const servingLabels: Record<ServingSize, string> = {
  skip: 'Skip',
  half: 'Half',
  full: 'Full',
  oneAndHalf: '1.5x',
  double: 'Double',
};