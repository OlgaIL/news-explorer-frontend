import React, {useCallback} from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import ElementForm from '../ElementForm/ElementForm';
import './PopupWithLogin.css';


function PopupWithLogin(props) {

	function handleSubmit (e) {
		// Запрещаем браузеру переходить по адресу формы
		e.preventDefault();
		if (props.submitStatus){props.onLogin();}
	}

return(
	<PopupWithForm 
		name = "login"
		title = "Вход"
		submitText = "Войти"
		onSubmit={handleSubmit}
		submitStatus={props.submitStatus}
		isOpen = {props.isOpen}
		onClose = {props.onClose}
		onClick = {props.onRegistration}
		formText="или "
		subLinkText="Зарегистрироваться"
		errorMessage={props.errorMessage}
		>

	<ElementForm 
			elementLabel="Email"
			elementName="email"
			elementType="email"
			elementPlaceHolder="Введите почту"
			elementMin="2"
			elementMax="40"
			onChange={props.handleChange}
			elementValue={props.inputValue.email || ''}
			formName = "login"
			textError={props.errors.email}
			/>

	<ElementForm 
			elementLabel="Пароль"
			elementName="password"
			elementType="password"
			elementPlaceHolder="Введите пароль"
			elementMin="8"
			elementMax="24"
			onChange={props.handleChange}
			elementValue={props.inputValue.password || ''}
			formName = "login"
			textError={props.errors.password}
		/>

	</PopupWithForm>
	);
}

export default PopupWithLogin;