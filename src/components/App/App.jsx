import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import useEvent  from 'use-add-event';

import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import About from '../About/About';

import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';

import {cards} from '../../constants/index';


import PopupWithLogin from '../PopupWithLogin/PopupWithLogin';
import PopupWithRegistation from '../PopupWithRegistation/PopupWithRegistation';
import PopupWithInfo from '../PopupWithInfo/PopupWithInfo';


import {CurrentUserContext} from '../../context/CurrentUserContext';


function App() {

	const [loggedIn , setIsLoggedIn] = React.useState(true);
	const [savedPage , setSavedPage] = React.useState(false);
	const [currentUser, setCurrentUser] = React.useState({name: 'Вася Васильков Васильевич'});
	
	const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
	const [isRegistrPopupOpen, setIsRegistrPopupOpen] = React.useState(false);
	const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState(false);

	const history = useHistory();
	
	const  handleEscClose = (evt) => {
		// console.log("слушаем кнопки");
		if (evt.key === 'Escape') closeAllPopups();
	}

	const checkPopup = (evt) => {
		//console.log(evt.target);
		const popupSelector= document.querySelector('.popup_opened');
		//console.log(popupSelector);
		if (evt.target === popupSelector) closeAllPopups();
	}

	useEvent('click', checkPopup);
	useEvent('keydown', handleEscClose);

/*
useEffect(() => {
	// Код подписки
	document.addEventListener('keydown', handleEscClose);
	document.addEventListener('click', checkPopup);
	// Указываем как производить очистку после этого эффекта:
	return function cleanup() {
		document.removeEventListener('keydown', handleEscClose);
		document.removeEventListener('click', checkPopup);
	};
  },[isLoginPopupOpen, isRegistrPopupOpen, isInfoPopupOpen]);
  */


	function handleOnLoguot(){
		setIsLoggedIn(false);
		history.push('/');
		handleNotSavedPage();
	}


	function handleSavedPage () {
		setSavedPage(true);
	}

	function handleNotSavedPage () {
		setSavedPage(false);
	}


	function handleOnLogin () {
		setIsRegistrPopupOpen(false);
		setIsInfoPopupOpen(false);
		setIsLoginPopupOpen(true);
	}

	
	function handleOnRegistration () {
		setIsLoginPopupOpen(false);
		setIsRegistrPopupOpen(true);
	}


	function closeAllPopups () {
		setIsLoginPopupOpen(false);
		setIsRegistrPopupOpen(false);
		setIsInfoPopupOpen(false);
}


return (
	<CurrentUserContext.Provider value={currentUser}>
		<div className="App">
			<div className="page">
				<Header  
					loggedIn={loggedIn} 
					savedPage={savedPage} 
					onClickSavedPage={handleSavedPage} 
					onClickNotSavedPage={handleNotSavedPage} 
					onLogin={handleOnLogin}
					onLogOut={handleOnLoguot} />

					<Switch>
						<Route path="/saved-news">
							<SavedNews  savedPage={true}  cards={cards} />
						</Route>

						<Route exact path="/*" >
							<Main  savedPage={savedPage} cards={cards} />
							<About />
						</Route>
						
					</Switch>
				<Footer />
			</div>
			
			<PopupWithLogin isOpen={isLoginPopupOpen} onClose={closeAllPopups} onRegistration = {handleOnRegistration} />
			<PopupWithRegistation isOpen={isRegistrPopupOpen} onClose={closeAllPopups} onLogin={handleOnLogin} />
			<PopupWithInfo isOpen={isInfoPopupOpen} onClose={closeAllPopups}  onLogin={handleOnLogin}/>

		</div>
	</CurrentUserContext.Provider>
	);

}

export default App;
