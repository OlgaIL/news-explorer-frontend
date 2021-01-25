import React from 'react';
import './ElementForm.css';

function ElementForm ({elementLabel, elementName, elementType, elementPlaceHolder, elementMin, elementMax, isOpen, onChange, elementValue, formName, textError }) {
	
function handleChangeLocal(event) {
	const {name, value} = event.target;
	console.log({name, value});
	onChange(event.target);
}

	return(
			<label className="form__input-label">{elementLabel}
				<input value={elementValue} type={elementType} className="form__input" name={elementName} minLength={elementMin} maxLength={elementMax} required placeholder={elementPlaceHolder} onChange={handleChangeLocal} />
				<span id={`${elementName}-${formName}-error`} className="form__error">{textError}</span>
			</label>

	);

}

export default ElementForm;