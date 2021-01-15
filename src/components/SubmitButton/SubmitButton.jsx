import React  from 'react';
import './SubmitButton.css';

function SubmitButton (props) {

	const submitClass = (
		` form__submit ${props.submitType ==='search' ? 'form__submit_type_search' : ''} ${!props.submitStatus ? 'form__submit_disable' : ''}`
	);

	return(
				<input type="submit" value={props.submitText} className={submitClass} />
	)
}

export default SubmitButton;


