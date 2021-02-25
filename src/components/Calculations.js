import React, { useEffect } from 'react';
import { Config } from '../config/config';
import { getZusTransfered, getTaxToPay } from '../helpers';

export const Calculations = ({ filteredEntries, configTaxYear, setTax, countTransferedTax, incomes }) => {

  const countZusTransfered = getZusTransfered(filteredEntries);

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

  const taxToPay = getTaxToPay(incomes, countZusTransfered, zusSpl, tax, zusZdr, countTransferedTax);

  useEffect(() => {
    setTax(taxToPay);
    console.log("zmiana taxu")
  }, [ taxToPay, setTax ])

  return (
    <>
      Wzór: { formula } = { taxToPay }
    </>
  );
};

