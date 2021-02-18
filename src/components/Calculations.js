import React from 'react';
import { Config } from '../config/config';
import { getIncomes, getZusTransfered } from '../helpers';

export const Calculations = (props) => {
  const { filteredEntries, previousYear } = props;

  const configYear = Config.taxes.find( taxes => taxes.year === previousYear );

  const incomes = getIncomes(filteredEntries);
  const countZusTransfered = getZusTransfered(filteredEntries);

  let formula = countZusTransfered > 1
    ? `[ ${incomes} - ( ${countZusTransfered} * ${configYear.zusSpl} ) ] * ${Config.tax}% - ${countZusTransfered} * ${configYear.zusZdr}`
    : `( ${incomes} - ${configYear.zusSpl} ) * ${Config.tax}% - ${configYear.zusZdr}`;
  if ( countZusTransfered === 0 ) {
    formula = `${incomes} * ${Config.tax}%`;
  }


  return (
    <>
      incomes: { incomes }<hr />
      zus transfered: { countZusTransfered }<hr />
      formuła do obliczenia: {formula}<hr />
    </>
  );
};

