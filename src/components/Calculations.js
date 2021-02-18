import React from "react";

export const Calculations = (props) => {
  const { filteredEntries } = props;
  return (
    <>
      incomes: { getIncomes(filteredEntries) }
    </>
  );
};

export const getIncomes = (entries) => {

  console.log(entries)

  console.log(entries.reduce((previus, current) => {
    const prev = previus ? previus.income : 0;
    const curr = current ? current.income : 0;
    return prev + curr;
  }))
}
