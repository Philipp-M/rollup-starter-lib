import ms from 'ms';
import lunchtime from './lunchtime';
import millisecondsUntil from './millisecondsUntil';

export default function howLongUntilLunch(hours: number = 12, minutes: number = 30) {
  const millisecondsUntilLunchTime = millisecondsUntil(lunchtime(hours, minutes));
  return ms(millisecondsUntilLunchTime, { long: true });
}
