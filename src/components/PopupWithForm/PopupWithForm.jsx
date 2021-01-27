import React  from 'react';
import { Link } from 'react-router-dom';
import './PopupWithForm.css';
import SubmitButton from '../SubmitButton/SubmitButton';


function PopupWithForm (props) {
	const footerFormClass = (
		`${!props.formText ? 'form__footer' : 'form__footer  form__footer_orlink'}`
	);


	return(
			<div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
				<div className="popup__container">

					<form name={props.name} className="form" noValidate onSubmit={props.onSubmit}>
						<div className="form__element">
							<h2 className="form__title">{props.title}</h2>
							{props.children}
							<span id={`form-${props.name}-error`} className="form__error form__error_type_sever">{props.errorMessage || ''}</span>
							{props.submitText!=='' ? <SubmitButton {...props} submitStatus={props.submitStatus}/> : ""}
							<div className={footerFormClass}>{props.formText} <Link  className="form__footer-link" onClick={props.onClick}>{props.subLinkText}</Link></div>
						</div>
						<button type="button" className="form__close" title="Закрыть" onClick={props.onClose}></button>
						
					</form>

				</div>
			</div>
	)
}

export default PopupWithForm;


