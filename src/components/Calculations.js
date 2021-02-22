import React, { useEffect } from 'react';
import { Config } from '../config/config';
import { getIncomes, getTransferredTax, getZusTransfered, getTaxToPay } from '../helpers';
import { ArrowClockwise } from "react-bootstrap-icons";

export const Calculations = ({ filteredEntries, configTaxYear, getData, setTax }) => {

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

  const taxToPay = getTaxToPay(incomes, countZusTransfered, zusSpl, tax, zusZdr, countTransferedTax);
  
  useEffect( () => {
    setTax(taxToPay);
    console.log("zmiana taxu")
  } , [taxToPay])

  return (
    <>
      <div className="row mb-3">
        <small>Suma dochodu z poprzednich miesięcy, odjąc suma składek społecznych razy stawka ryczałtu odjąć suma składek zdrowotnych do odliczenia odjąć podatek zapłacony</small>
      </div>
      <div className="row mb-3">
        { formula }
      </div>
      <div className="row mb-3">
        <strong className="mr-2">Podatek do zapłaty: { taxToPay }</strong>
        <button type="submit" onClick={ getData } className="btn btn-outline-secondary btn-sm border-none"><ArrowClockwise size="16" /></button>
      </div>
    </>
  );
};

