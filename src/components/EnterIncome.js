import React, { useState } from "react";

export const EnterIncome = (props) => {

  const [ income, setIncome ] = useState(props.defaultIncome);

  const onChangeIncome = (event) => {
    setIncome(event.target.value);
  }

  const submitIncome = () => {

  }

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Podaj dochód za: ...{ income }</label>
        <input type="number" className="form-control" aria-describedby="income" onChange={ onChangeIncome } value={income} />
      </div>
      <button type="submit" className="btn btn-primary" onClick={ submitIncome }>Zapisz</button>
    </form>
  );
};
