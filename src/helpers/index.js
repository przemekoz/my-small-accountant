export const getPreviousMonthYear = (currentMonth, currentYear) => {
  if (currentMonth > 0) {
    return [ parseInt(currentMonth, 10) - 1, parseInt(currentYear, 10) ];
  }
  // if now is january
  return [ 11, parseInt(currentYear, 10) - 1 ];
};

export const getZusTransfered = (entries) => {
  const result = entries.filter(entry => entry.transferredZus);
  return result ? result.length : 0;
};

export const getIncomes = (entries) => {
  return getSumValues(entries, "income");
};

export const getTransferredTax = (entries) => {
  return getSumValues(entries, "transferredTax");
};

export const getSumValues = (entries, propName) => {
  const sum = entries.reduce((previus, current) => {
    return previus + current[ propName ];
  }, 0);
  return sum;
};

export const getTaxToPay = (incomes, countZusTransfered, zusSpl, tax, zusZdr, countTransferedTax) => {
  const result = ((parseInt(incomes, 10) - (countZusTransfered * zusSpl)) * tax / 100) - (countZusTransfered * zusZdr) - countTransferedTax;
  return result < 0 ? 0 : Math.ceil(result);
}

