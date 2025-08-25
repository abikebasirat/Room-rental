
import React, { useEffect, useState } from 'react'
import { TbArrowsExchange } from "react-icons/tb";

import "../styles/Converter.scss"




function ConverterPage() {
  const [rates, setRates] = useState();
  const [ratesFetched, setRatesFetched] = useState(false);
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("USD");
  const [output, setOutput] = useState();

  const getRates = async () => {
   
    const API_KEY = process.env.REACT_APP_CONVERTER_KEY 
    
    const response = await fetch(
     `https://v6.exchangerate-api.com/v6/2f478d4d368a9bfa73f2e0e4/latest/${fromCurrency}`

    // `https://dream-nesxt.vercel.app/`
    ).then((response) => response.json());

   
    if (response.result === "success") {
      setRates(response.conversion_rates);
      setRatesFetched(true);
    }
  };

  useEffect(() => {
    getRates();
  }, []);

  const calculateOutput = async () => {
   
    const response = await fetch(
     `https://v6.exchangerate-api.com/v6/2f478d4d368a9bfa73f2e0e4/latest/USD`

    // `https://dream-nesxt.vercel.app/`
    ).then((response) => response.json());
    const fetchedRates = response.conversion_rates;
    const CurrencyRate = fetchedRates[toCurrency];
    const output = amount * CurrencyRate;
    setOutput(output);
  };

  {/* <div className='topic'> */}
  return (
    <div>
      <div>
      {/* <div className='topic'>Convert your money here</div> */}
      {/* </div> */}
       </div>
    <div className="container">
      <h1>Convert your money here</h1>
      <div className="input-amount">
        <label>Amount:</label>
        <input
          type="number"
          id="amount"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
        />
      </div>
    

      <div className="input-from">
        <label>From:</label>
        <select
          id="from"
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {ratesFetched ? (
            Object.keys(rates).map((currency, index) => (
              <option key={index} value={currency}>
                {currency}
              </option>
            ))
          ) : (
            <div className='option'>
            <option defaultValue>USD</option>
            </div>
          )}
        </select>
      </div>

      <div className="input-to">
        <label>To:</label>
        <select
          id="to"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {ratesFetched ? (
            Object.keys(rates).map((currency, index) => (
              <option key={index} value={currency}>
                {currency}
              </option>
            ))
          ) : (
            <option defaultValue>EUR</option>
          )}
        </select>
      </div>
      <button className="btn" onClick={() => calculateOutput()}>
        Converter
      </button>
      <div className="output">
        <label>Output: {output}</label>
       
      </div>
    </div>
    </div>
  );
}

export default ConverterPage;