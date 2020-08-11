import {useState} from 'react';

const InputBind = initialValue => {
	const [value, setValue] = useState(initialValue);

	const bind = {
		value,
		onChange: e => setValue(e.target.value)
	}

	return bind
}

export default InputBind