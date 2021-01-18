import React, {useEffect} from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import ElementForm from '../ElementForm/ElementForm';
import './PopupWithRegistation.css';



function PopupWithRegistation(props) {

	const [inputValue , setInputValue] = React.useState({
		email: '',
		password: '',
		name : ''
	});

	const [submitStatus , setSubmitStatus] = React.useState(false);


	useEffect(() => {
				setInputValue({
					email :  '',
					password : '',
					name : ''
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



	function handleSubmit(e) {
		// Запрещаем браузеру переходить по адресу формы
		e.preventDefault();
	}


return(
	<PopupWithForm 
		name = "registration"
		title = "Регистрация"
		submitText = "Зарегистрироваться"
		onSubmit={handleSubmit}
		submitStatus={submitStatus}
		isOpen = {props.isOpen}
		onClose = {props.onClose}
		onClick = {props.onLogin}
		formText="или "
		subLinkText="Войти"
		>

		<ElementForm 
			elementLabel="Email"
			elementName="email"
			elementType="text"
			elementPlaceHolder="Введите e-mail"
			elementMin="2"
			elementMax="40"
			isOpen={props.isOpen}
			onChange={handleChange}
			elementValue={inputValue.email}
			formname = "registration"
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
			formname = "registration"
			
		/>
		
		
		<ElementForm 
			elementLabel="Имя"
			elementName="name"
			elementType="text"
			elementPlaceHolder="Введите свое имя"
			elementMin="2"
			elementMax="60"
			onChange={handleChange}
			elementValue={inputValue.name}
			formname = "registration"
			/>


</PopupWithForm>

	);


}

export default PopupWithRegistation;