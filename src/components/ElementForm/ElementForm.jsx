import React from 'react';
import './ElementForm.css';

function ElementForm ({elementLabel, elementName, elementType, elementPlaceHolder, elementMin, elementMax, onChange, elementValue, formName, textError }) {

	return(
			<label className="form__input-label">{elementLabel}
				<input value={elementValue} type={elementType} className="form__input" name={elementName} minLength={elementMin} maxLength={elementMax} required placeholder={elementPlaceHolder} onChange={onChange} />
				<span id={`${elementName}-${formName}-error`} className="form__error">{textError}</span>
			</label>

	);

}

export default ElementForm;