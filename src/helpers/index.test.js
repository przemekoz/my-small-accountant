
import { getPreviousMonthYear } from './';

test('should getPreviousMonthYear returns january 2020', () => {
  const [ month, year ] = getPreviousMonthYear(1, 2020);
  expect(month).toEqual(0);
  expect(year).toEqual(2020);
});

test('should getPreviousMonthYear returns january 2020', () => {
  const [ month, year ] = getPreviousMonthYear("1", "2020");
  expect(month).toEqual(0);
  expect(year).toEqual(2020);
});


test('should getPreviousMonthYear returns decmber 2019', () => {
  const [ month, year ] = getPreviousMonthYear(0, 2020);
  expect(month).toEqual(11);
  expect(year).toEqual(2019);
});
