
import { 
  getPreviousMonthYear, 
  getIncomes,
  getZusTransfered,
 } from './';

test('getPreviousMonthYear should returns january 2020', () => {
  const [ month, year ] = getPreviousMonthYear(1, 2020);
  expect(month).toBe(0);
  expect(year).toBe(2020);
});

test('getPreviousMonthYear should returns january 2020', () => {
  const [ month, year ] = getPreviousMonthYear("1", "2020");
  expect(month).toBe(0);
  expect(year).toBe(2020);
});


test('getPreviousMonthYear should returns decmber 2019', () => {
  const [ month, year ] = getPreviousMonthYear(0, 2020);
  expect(month).toBe(11);
  expect(year).toBe(2019);
});

// -------------------------------------------------------------------------------

test('getIncomes should returns zero 0', () => {
  const entries = [];
  const sumIncomes = getIncomes(entries);
  expect(sumIncomes).toBe(0);
});

test('getIncomes should returns zero 0', () => {
  const entries = [
    {
      income: 0
    }
  ];
  const sumIncomes = getIncomes(entries);
  expect(sumIncomes).toBe(0);
});

test('getIncomes should returns zero 0', () => {
  const entries = [
    {
      income: 0
    },
    {
      income: 0
    }
  ];
  const sumIncomes = getIncomes(entries);
  expect(sumIncomes).toBe(0);
});

test('getIncomes should returns zero 301', () => {
  const entries = [
    {
      income: 100
    },
    {
      income: 201
    }
  ];
  const sumIncomes = getIncomes(entries);
  expect(sumIncomes).toBe(301);
});

test('getIncomes should returns zero 30101', () => {
  const entries = [
    {
      income: 0
    },
    {
      income: 10000
    },
    {
      income: 15001
    },
    {
      income: 100
    },
    {
      income: 5000
    },
  ];
  const sumIncomes = getIncomes(entries);
  expect(sumIncomes).toBe(30101);
});


// -------------------------------------------------------------------------------

test('getZusTransfered should returns zero 0', () => {
  const entries = [];
  const count = getZusTransfered(entries);
  expect(count).toBe(0);
});

test('getZusTransfered should returns zero 0', () => {
  const entries = [
    {
      transferredZus: false
    }
  ];
  const count = getZusTransfered(entries);
  expect(count).toBe(0);
});

test('getZusTransfered should returns zero 0', () => {
  const entries = [
    {
      transferredZus: false
    },
    {
      transferredZus: false
    },
  ];
  const count = getZusTransfered(entries);
  expect(count).toBe(0);
});


test('getZusTransfered should returns 1', () => {
  const entries = [
    {
      transferredZus: false
    },
    {
      transferredZus: true
    },
    {
      transferredZus: false
    },
  ];
  const count = getZusTransfered(entries);
  expect(count).toBe(1);
});

