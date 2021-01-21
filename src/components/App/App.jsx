import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import useEvent  from 'use-add-event';

import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import About from '../About/About';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'; // импортируем HOC

import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';


import api from '../../utils/NewsApi';
import {setResult, getResult} from '../../utils/results';
import {dateTo, dateFrom} from '../../utils/date';

import  {setToken, getToken, removeToken} from '../../utils/token';
import  userAuth from '../../utils/auth';

import PopupWithLogin from '../PopupWithLogin/PopupWithLogin';
import PopupWithRegistation from '../PopupWithRegistation/PopupWithRegistation';
import PopupWithInfo from '../PopupWithInfo/PopupWithInfo';


import {CurrentUserContext} from '../../context/CurrentUserContext';


function App() {

	const [loggedIn , setIsLoggedIn] = React.useState(false);
	const [savedPage , setSavedPage] = React.useState(false);
	const [currentUser, setCurrentUser] = React.useState({name: ''});
	
	const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
	const [isRegistrPopupOpen, setIsRegistrPopupOpen] = React.useState(false);
	const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState(false);
	
	const [isPreload, setIsPreload] = React.useState(false);
	
	const [cards, setCards] = React.useState([]);

	const [statusSearch, setIsStatusSearch] = React.useState('');
	const [totalResults, setIsTotalResults] = React.useState(-1);


	function initState(res){
		setCards(res.articles);
		setIsStatusSearch(res.status);
		setIsTotalResults(res.totalResults);

	}

	const resultCheck = () => {
		const result = getResult();
			if (!result) {
			return;
			}
			initState(result);
	}

	const tokenCheck = () => {
		const jwt = getToken();
		if (!jwt) {
		return;
			}

		userAuth.getContent(jwt).then((res) => {
				if (res) {
				// console.log(res);
					const userName = {
							name: res.name
					}
					setIsLoggedIn(true);
					setCurrentUser(userName);
				//	history.push('/cards')
				}
				
			})
			.catch(err => console.log( err));
	}


	useEffect(() => {
		resultCheck();
		// tokenCheck();
		// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []);

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


	const handleOnSearch = async (query) => {
		try{
				setIsPreload(true);
				const data = await api.getSearchCards(query, dateFrom, dateTo);
				initState(data);
				setResult(data);

		} catch(error) { 
			setIsStatusSearch("error");
			console.log(error);
		} finally { 
			setIsPreload(false);
		}
	}

	function handleOnLoguot(){
		setIsLoggedIn(false);
		history.push('/');
		handleNotSavedPage();
	}

	function handleSubmitOnLogin(password, email){
		userAuth.authorize(password, email)
		.then((res) => {
			if (res.token) {
				setToken (res.token);
				setIsLoggedIn(true);
				tokenCheck();
				//history.push('/');
				closeAllPopups ()
				}
		})
		.catch((err) => {console.log(err);});

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
						<ProtectedRoute path="/saved-news" loggedIn={loggedIn}>
									<SavedNews savedPage={true}  cards={cards} />
						</ProtectedRoute>

						<Route exact path="/*" >
							<Main cards={cards} statusSearch={statusSearch} totalResults={totalResults} onSearch={handleOnSearch} isPreload={isPreload}  loggedIn={loggedIn} onLogin={handleOnLogin} />
							<About />
						</Route>

					</Switch>
				<Footer />
			</div>
			
			<PopupWithLogin isOpen={isLoginPopupOpen} onClose={closeAllPopups} onRegistration = {handleOnRegistration} onLogin={handleSubmitOnLogin}  />
			<PopupWithRegistation isOpen={isRegistrPopupOpen} onClose={closeAllPopups} onLogin={handleOnLogin} />
			<PopupWithInfo isOpen={isInfoPopupOpen} onClose={closeAllPopups}  onLogin={handleOnLogin}/>

		</div>
	</CurrentUserContext.Provider>
	);

}

export default App;
