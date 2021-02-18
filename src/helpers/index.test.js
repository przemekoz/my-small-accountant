
import { 
  getPreviousMonthYear, 
  getIncomes,
  getZusTransfered,
  getTransferredTax,
  getTaxToPay,
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


// -------------------------------------------------------------------------------

test('getTransferredTax should returns zero 0', () => {
  const entries = [];
  const sum = getTransferredTax(entries);
  expect(sum).toBe(0);
});

test('getTransferredTax should returns zero 0', () => {
  const entries = [
    {
      transferredTax: 0
    }
  ];
  const sum = getTransferredTax(entries);
  expect(sum).toBe(0);
});

test('getTransferredTax should returns zero 0', () => {
  const entries = [
    {
      transferredTax: 0
    },
    {
      transferredTax: 0
    },
  ];
  const sum = getTransferredTax(entries);
  expect(sum).toBe(0);
});

test('getTransferredTax should returns 101', () => {
  const entries = [
    {
      transferredTax: 0
    },
    {
      transferredTax: 101
    },
    {
      transferredTax: 0
    },
  ];
  const sum = getTransferredTax(entries);
  expect(sum).toBe(101);
});


// -------------------------------------------------------------------------------
// metoda narastajaca
// (dochod - skaladki spoleczne) * ryczałt - skladka zdrowotna do odliczen - zaplacony podatek
// -------------------------------------------------------------------------------

test('getTaxToPay should returns valid value', () => {
  const incomes = 1000;
  const countZusTransfered = 0;
  const zusSpl = 101.11;
  const tax = 15;
  const zusZdr = 192.22;
  const countTransferedTax = 0;
  // ((1000 - 0 * 101.11) * 15%) - 0 * 192.22 - 0
  // 1000 * 15% 
  const result = getTaxToPay(incomes, countZusTransfered, zusSpl, tax, zusZdr, countTransferedTax);
  expect(result).toBe(150);
});

test('getTaxToPay should returns valid value', () => {
  const incomes = 12900;
  const countZusTransfered = 0;
  const zusSpl = 101.11;
  const tax = 15;
  const zusZdr = 192.22;
  const countTransferedTax = 0;
  // 12900 * 15% 
  const result = getTaxToPay(incomes, countZusTransfered, zusSpl, tax, zusZdr, countTransferedTax);
  expect(result).toBe(1935);
});

test('getTaxToPay should returns valid value', () => {
  const incomes = 350;
  const countZusTransfered = 1;
  const zusSpl = 101.11;
  const tax = 15;
  const zusZdr = 192.22;
  const countTransferedTax = 0;
  // ((350 - 101.11) * 15%) - 192.22 - 0
  // when tax is less than 0 then result should be 0
  const result = getTaxToPay(incomes, countZusTransfered, zusSpl, tax, zusZdr, countTransferedTax);
  expect(result).toBe(0);
});

test('getTaxToPay should returns valid value', () => {
  const incomes = 12900;
  const countZusTransfered = 1;
  const zusSpl = 101.11;
  const tax = 15;
  const zusZdr = 192.22;
  const countTransferedTax = 50;
  // ((12900 - 1 * 101.11) * 15%) - 1 * 192.22 - 50
  const result = getTaxToPay(incomes, countZusTransfered, zusSpl, tax, zusZdr, countTransferedTax);
  expect(result).toBe(1678);
});


test('getTaxToPay should returns valid value', () => {
  const incomes = 168901;
  const countZusTransfered = 12;
  const zusSpl = 123.24;
  const tax = 15;
  const zusZdr = 191.21;
  const countTransferedTax = 9899;
  // ((168901 - 12 * 123.24) * 15%) - 12 * 191.21 - 9899
  const result = getTaxToPay(incomes, countZusTransfered, zusSpl, tax, zusZdr, countTransferedTax);
  expect(result).toBe(12920);
});
