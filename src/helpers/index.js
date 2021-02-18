export const getPreviousMonthYear = (currentMonth, currentYear) => {
  if (currentMonth > 0) {
    return [ parseInt(currentMonth, 10) - 1, parseInt(currentYear, 10) ];
  }
  // if now is january
  return [ 11, parseInt(currentYear, 10) - 1 ];
}