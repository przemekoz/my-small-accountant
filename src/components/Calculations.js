import React from "react";
import { Entries } from "../data/entries";

export const Calculations = (props) => {
  const { currentMonth, currentYear } = props;
  return (
    <>
      incomes: { getIncomes(currentMonth, currentYear) }
    </>
  );
};

export const getIncomes = (currentMonth, currentYear) => {
  if (currentMonth > 0) {
    console.log("od stycznia do miesiąc przed aktualnym miesiącem")
    const filteredEntries = Entries.filter(entry => {
      return entry.year === currentYear && entry.month < currentMonth;
    });

    console.log(filteredEntries)

    console.log(filteredEntries.reduce((previus, current) => {
      const prev = previus ? previus.income : 0;
      const curr = current ? current.income : 0;
      return prev + curr;
    }))
    return;
  }

  console.log("caly porzedni rok")
  // @TODO pobierz caly poprzedni rok
  console.log(Entries.filter(entry => {
    return parseInt(entry.year, 10) === parseInt(currentYear - 1, 10);
  }))
}
