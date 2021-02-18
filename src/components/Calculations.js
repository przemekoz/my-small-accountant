import React from 'react';
import { Config } from '../config/config';
import { getIncomes, getZusTransfered } from '../helpers';

export const Calculations = (props) => {
  const { filteredEntries, configTaxYear } = props;

  const incomes = getIncomes(filteredEntries);
  const countZusTransfered = getZusTransfered(filteredEntries);

  const tax = Config.tax;
  const zusSpl = configTaxYear.zusSpl;
  const zusZdr = configTaxYear.zusZdr;

  let formula = countZusTransfered > 1
    ? `[ ${incomes} - ( ${countZusTransfered} * ${zusSpl} ) ] * ${tax}% - ${countZusTransfered} * ${zusZdr}`
    : `( ${incomes} - ${zusSpl} ) * ${tax}% - ${zusZdr}`;
  if ( countZusTransfered === 0 ) {
    formula = `${incomes} * ${tax}%`;
  }

  return (
    <>
      incomes: { incomes }<hr />
      zus transfered: { countZusTransfered }<hr />
      formuła do obliczenia: {formula}<hr />
    </>
  );
};

