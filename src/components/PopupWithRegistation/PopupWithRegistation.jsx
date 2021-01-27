import React, {useEffect} from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import ElementForm from '../ElementForm/ElementForm';
import './PopupWithRegistation.css';



function PopupWithRegistation(props) {

	function handleSubmit(e) {
		// Запрещаем браузеру переходить по адресу формы
		e.preventDefault();
		if(props.submitStatus) props.onRegistration();
	}


return(
	<PopupWithForm 
		name = "registration"
		title = "Регистрация"
		submitText = "Зарегистрироваться"
		onSubmit={handleSubmit}
		submitStatus={props.submitStatus}
		isOpen = {props.isOpen}
		onClose = {props.onClose}
		onClick = {props.onLogin}
		formText="или "
		subLinkText="Войти"
		errorMessage={props.errorMessage}
		>

		<ElementForm 
			elementLabel="Email"
			elementName="email"
			elementType="email"
			elementPlaceHolder="Введите e-mail"
			elementMin="2"
			elementMax="40"
			onChange={props.handleChange}
			elementValue={props.inputValue.email || ''}
			textError={props.errors.email}
			formName = "registration"
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
			formName = "registration"
			textError={props.errors.password}
			
		/>
		
		
		<ElementForm 
			elementLabel="Имя"
			elementName="name"
			elementType="text"
			elementPlaceHolder="Введите свое имя"
			elementMin="2"
			elementMax="60"
			onChange={props.handleChange}
			elementValue={props.inputValue.name  || ''}
			formName = "registration"
			textError={props.errors.name}
			/>


</PopupWithForm>

	);


}

export default PopupWithRegistation;