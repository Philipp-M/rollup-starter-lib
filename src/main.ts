import ms from 'ms';
import lunchtime from './lunchtime';
import millisecondsUntil from './millisecondsUntil';

export default function howLongUntilLunch(h: number = 12, minutes: number = 30) {
  const m = millisecondsUntil(lunchtime(h, minutes));
  return ms(m, { long: true });
}
