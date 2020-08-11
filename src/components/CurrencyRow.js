import React, {useState} from 'react';
    
const CurrencyRow = ({bind, currencyOption, defaultCurrency, onChangeRatesHandler}) => {

	return(
		<div>
			<input type="text" value={bind.value} onChange={bind.method} />
			<select name="" id="" onChange={onChangeRatesHandler} value={defaultCurrency} >
				{	
					currencyOption.map( option => 
						<option key={option} value={option}>{option}</option>
					)
				}
			</select>
		</div>
	)
}

export default React.memo(CurrencyRow)