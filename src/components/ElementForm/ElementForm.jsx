import React, {useEffect} from 'react';

import './ElementForm.css';

function ElementForm ({elementLabel, elementName, elementType, elementPlaceHolder, elementMin, elementMax, isOpen, onChange, elementValue, formname}) {
	
function handleChangeLocal(event) {
	const {name, value} = event.target;
	console.log({name, value});
	onChange(event.target);
}

	return(
			<label className="form__input-label">{elementLabel}
				<input value={elementValue} type={elementType} className="form__input" name={elementName} minLength={elementMin} maxLength={elementMax} required placeholder={elementPlaceHolder} onChange={handleChangeLocal} />
				<span id={`${elementName}-${formname}-error`} className="form__error"></span>
			</label>

	);

}

export default ElementForm;