import howLongTillLunch from '../src/main';

class MockDate {
  private date = 0;

  private hours = 0;

  private minutes = 0;

  private seconds = 0;

  private milliseconds = 0;

  getDate(): number { return this.date; }

  setDate(date: number): void { this.date = date; }

  setHours(h: number) { this.hours = h; }

  setMinutes(m: number): void { this.minutes = m; }

  setSeconds(s: number): void { this.seconds = s; }

  setMilliseconds(ms: number): void { this.milliseconds = ms; }

  getTime(): number { return this.valueOf(); }

  valueOf(): number {
    return (
      this.milliseconds
      + this.seconds * 1e3
      + this.minutes * 1e3 * 60
      + this.hours * 1e3 * 60 * 60
      + this.date * 1e3 * 60 * 60 * 24
    );
  }

  static now: () => number;
}

const now = new MockDate();
MockDate.now = () => now.valueOf();
let lunchtime = [12, 30];

global.Date = MockDate as any as typeof Date;


test('howLongTillLunch', () => {
  const t = (hours: number, minutes: number, seconds: number, expected: string): void => {
    now.setHours(hours);
    now.setMinutes(minutes);
    now.setSeconds(seconds);
    expect(howLongTillLunch(...lunchtime)).toBe(expected);
  };
  t(11, 30, 0, '1 hour');
  t(10, 30, 0, '2 hours');
  t(12, 25, 0, '5 minutes');
  t(12, 29, 15, '45 seconds');
  t(13, 30, 0, '23 hours');

  // some of us like an early lunch
  lunchtime = [11, 0];
  t(10, 30, 0, '30 minutes');

  // default values
  now.setHours(11);
  now.setMinutes(0);
  now.setSeconds(0);
  expect(howLongTillLunch()).toBe('2 hours');
});
