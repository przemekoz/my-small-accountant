import React from "react";
import { Calculations } from "./Calculations";
import { Entries } from "./Entries";
import { EntriesData } from "../data/entries";

export const EntriesCalculations = (props) => {
  const { currentMonth, currentYear, previousYear } = props;

  const filteredEntries = EntriesData.filter(entry => {
    const yearCondition = currentMonth > 0 ? entry.year === currentYear : entry.year === previousYear;
    const monthCondition = currentMonth > 0 ? entry.month < currentMonth : true;
    return yearCondition && monthCondition;
  });

  return (
    <>
      <Entries filteredEntries={ filteredEntries } />
      <Calculations filteredEntries={ filteredEntries } />
    </>
  )
};