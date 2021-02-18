import React from "react";
import { Calculations } from "./Calculations";
import { Entries } from "./Entries";
import { EntriesData } from "../data/entries";
import { Config } from "../config/config";

export const EntriesCalculations = (props) => {
  const { currentMonth, currentYear, previousYear } = props;
  const configTaxYear = Config.taxes.find( taxes => taxes.year === previousYear );  

  const filteredEntries = EntriesData.filter(entry => {
    const yearCondition = currentMonth > 0 ? entry.year === currentYear : entry.year === previousYear;
    const monthCondition = currentMonth > 0 ? entry.month < currentMonth : true;
    return yearCondition && monthCondition;
  });

  return (
    <>
      <Entries filteredEntries={ filteredEntries } configTaxYear={configTaxYear} />
      <Calculations filteredEntries={ filteredEntries } previousYear={ previousYear } configTaxYear={configTaxYear} />
    </>
  )
};