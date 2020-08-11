import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import './App.css';
import CurrencyRow from './components/CurrencyRow'

function App() {

    const [currencyOption, setCurrencyOption] = useState([]); // []
    const [firstCurrency, setFirstCurrency] = useState(); // []
    const [secondCurrency, setSecondCurrency] = useState(); // []
    const [firstInput, setfirstInput] = useState(1);
    const [secondInput, setSecondInput] = useState(0);

    const onChangeInputHandler = e => {
       setfirstInput(e.target.value);
       setSecondInput(e.target.value * currencyOption[secondCurrency])
    }

    const onChangeInputHandler2 = e => {
       setSecondInput(e.target.value);
       setfirstInput(e.target.value *  currencyOption[firstCurrency])
    }

    const onChangeRatesHandler = e => {
        setFirstCurrency(e.target.value);
        setSecondInput(firstInput * currencyOption[e.target.value]);
        /*
            if changed
               get the current input value then
               get the value of the selected rate
               then set the product of both values besides the
               rate that changed.
         */
    }

    const onChangeRatesHandler2 = e => {
        setSecondCurrency(e.target.value);
        setfirstInput(secondInput * currencyOption[e.target.value]);
    }

    useEffect( () => {

        Axios.get('https://api.exchangeratesapi.io/latest')
        .then( response => {
            // setCurrencyOption([response.data.base, ...Object.keys(response.data.rates) ])
            const rateKeys = Object.keys;
            const rates = response.data.rates;

            setCurrencyOption(rates);
            setFirstCurrency(rateKeys(rates)[0]);
            setSecondCurrency(rateKeys(rates)[1]);
            setSecondInput(rates[rateKeys(rates)[0]]);
           
        } )
        .catch( error => console.log(error))
         }
    , [] )

  return (
    <div className="App">
        <h1>Convert</h1>
        <CurrencyRow 
            bind={ {value: firstInput, method: onChangeInputHandler } } 
            currencyOption={Object.keys(currencyOption)} 
            defaultCurrency={firstCurrency} 
            onChangeRatesHandler={onChangeRatesHandler}
        />
        <p>=</p>
        <CurrencyRow 
            bind={ {value:secondInput, method: onChangeInputHandler2} } 
            currencyOption={Object.keys(currencyOption)} 
            defaultCurrency={secondCurrency}
            onChangeRatesHandler={onChangeRatesHandler2}
        />
    </div>
  );
}

export default App;
