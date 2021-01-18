import React, {useEffect} from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import ElementForm from '../ElementForm/ElementForm';
import './PopupWithLogin.css';


function PopupWithLogin(props) {

const [inputValue , setInputValue] = React.useState({
		email: '',
		password: ''
	});

	const [submitStatus , setSubmitStatus] = React.useState(false);


	useEffect(() => {
				setInputValue({
					email :  '',
					password : ''
				});
	}, [props.isOpen]);


	function handleChange ({name, value}) {
		setInputValue({
			...inputValue,
			[name]: value,
		});
	}

	
	useEffect(() => {
		if ((inputValue.email!=='')&&(inputValue.password!=='')){setSubmitStatus(true);}
			else {setSubmitStatus(false)};
	}, [inputValue]);


	function handleSubmit (e) {
		// Запрещаем браузеру переходить по адресу формы
		e.preventDefault();
	}

return(
	<PopupWithForm 
		name = "login"
		title = "Вход"
		submitText = "Войти"
		onSubmit={handleSubmit}
		submitStatus={submitStatus}
		isOpen = {props.isOpen}
		onClose = {props.onClose}
		onClick = {props.onRegistration}
		formText="или "
		subLinkText="Зарегистрироваться"
		>

	<ElementForm 
			elementLabel="Email"
			elementName="email"
			elementType="text"
			elementPlaceHolder="Введите почту"
			elementMin="2"
			elementMax="40"
			isOpen={props.isOpen}
			onChange={handleChange}
			elementValue={inputValue.email}
			formname = "login"
			/>

	<ElementForm 
			elementLabel="Пароль"
			elementName="password"
			elementType="password"
			elementPlaceHolder="Введите пароль"
			elementMin="8"
			elementMax="24"
			isOpen={props.isOpen}
			onChange={handleChange}
			elementValue={inputValue.password}
			formname = "login"
		/>

	</PopupWithForm>
	);
}

export default PopupWithLogin;