export const getPreviousMonthYear = (currentMonth, currentYear) => {
  if (currentMonth > 0) {
    return [ parseInt(currentMonth, 10) - 1, parseInt(currentYear, 10) ];
  }
  // if now is january
  return [ 11, parseInt(currentYear, 10) - 1 ];
};

export const getIncomes = (entries) => {
  const sum = entries.reduce((previus, current) => {
    return previus + current.income;
  }, 0);
  return sum;
};

export const getZusTransfered = (entries) => {
  const result = entries.filter(entry => entry.transferredZus);
  return result ? result.length : 0;
};
