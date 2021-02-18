import React from 'react';
import { Config } from '../config/config';
import { getIncomes, getTransferredTax, getZusTransfered, getTaxToPay } from '../helpers';

export const Calculations = (props) => {
  const { filteredEntries, configTaxYear } = props;

  const incomes = getIncomes(filteredEntries);
  const countZusTransfered = getZusTransfered(filteredEntries);
  const countTransferedTax = getTransferredTax(filteredEntries);

  const tax = Config.tax;
  const zusSpl = configTaxYear.zusSpl;
  const zusZdr = configTaxYear.zusZdr;
  const transferedTaxCond = countTransferedTax > 0 ? `- ${ countTransferedTax }` : '';

  let formula = countZusTransfered > 1
    ? `[ ${ incomes } - ( ${ countZusTransfered } * ${ zusSpl } ) ] * ${ tax }% - ${ countZusTransfered } * ${ zusZdr } ${ transferedTaxCond }`
    : `( ${ incomes } - ${ zusSpl } ) * ${ tax }% - ${ zusZdr } ${ transferedTaxCond }`;
  if (countZusTransfered === 0) {
    formula = `${ incomes } * ${ tax }% ${ transferedTaxCond }`;
  }

  return (
    <>
      <div className="row mb-3">
        <small>Suma dochodu z poprzednich miesięcy, odjąc suma składek społecznych razy stawka ryczałtu odjąć suma składek zdrowotnych do odliczenia odjąć podatek zapłacony</small>
      </div>
      <div className="row mb-3">
        { formula }
      </div>
      <div className="row mb-3">
        <strong>Podatek do zapłaty: { getTaxToPay(incomes, countZusTransfered, zusSpl, tax, zusZdr, countTransferedTax) }</strong>
        <button>odśwież</button>
      </div>
    </>
  );
};

