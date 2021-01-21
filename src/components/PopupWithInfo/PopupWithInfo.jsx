import React  from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import './PopupWithInfo.css';


function PopupWithInfo (props) {
		
	return(
		<PopupWithForm 
			name = "Info"
			title = "Пользователь успешно зарегистрирован!"
			submitStatus="false"
			submitText = ""
			isOpen = {props.isOpen}
			onClose = {props.onClose}
			onClick = {props.onLogin}
			formText=""
			subLinkText="Войти">
		</PopupWithForm>

	)
}

export default PopupWithInfo;


