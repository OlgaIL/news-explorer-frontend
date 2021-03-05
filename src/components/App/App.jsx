import React, { useEffect, useCallback } from 'react';
import {Route, Switch, useHistory, useLocation } from 'react-router-dom';
import useEvent  from 'use-add-event';


import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import About from '../About/About';


import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'; // импортируем HOC

import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';


import api from '../../utils/NewsApi';
import {setLocal, getLocal } from '../../utils/local';
import {setToken, getToken, removeToken} from '../../utils/token';

import {dateTo, dateFrom} from '../../utils/date';



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

const [savedCards, setSavedCards] = React.useState([]);

const [searchQuery, setSearchQuery] = React.useState({query:'', status: '', totalResults: 0 });


const [errorMessage, setErrorMessage] = React.useState({});

const history = useHistory();

const location = useLocation().pathname;

useEffect(() =>{
	if(location === "/saved-news"){ handleSavedPage() }else{handleNotSavedPage()}
},[location])


const resultAndQueryCheck = () => {
		const result = getLocal('searchResult');
		if (!result) {
		return;
		}
		setCards(result);
	
	const searchQuery = getLocal('searchQuery');
		if (!searchQuery) {
		return;
		}
		//console.log(searchQuery);
		setSearchQuery(searchQuery);
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
				console.log(userName);
			
			}
			
		})
		.catch(err => console.log(err));
}


const loadSavedCards = async ()  => {
	try{
		setIsPreload(true);
		const data = await userAuth.getSavedCards();
		const savedCards = data.map(
			function (element) {
				const newElement = {
					"source" : { 
							"id": element.source,
							"name": element.source
						},
					"title": element.title,
					"description":  element.text,
					"url": element.link,
					"urlToImage": element.image,
					"publishedAt":  element.date,
					"keyword" : element.keyword,
					"_id" : element._id
				}
				return newElement;
		});

		setSavedCards(savedCards);

	} catch(error) { 
		console.log(error);

	} finally { 
		setIsPreload(false);
	}
}


useEffect(() => {
	 resultAndQueryCheck();
	 tokenCheck();
	// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


useEffect(() => {
	if (loggedIn) loadSavedCards();
	}, [loggedIn]);



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
					
			//console.log(data);
			const sQuery = {
			"query" : query,
			"status": data.status,
			"totalResults" : data.totalResults}

		
			setLocal('searchResult', data.articles);
			setLocal('searchQuery', sQuery);
			
			setCards(data.articles);
			setSearchQuery(sQuery);


	} catch(error) { 
		console.log(error);
			setSearchQuery({
			"query" : query,
			"status" : "error",
			"totalResults" : ""});

	} finally { 
		setIsPreload(false);
	}
}

function handleOnLoguot(){
	setIsLoggedIn(false);
	removeToken();
	history.push('/');
	handleNotSavedPage();
}


function handleSubmitOnLogin(){
	const {password, email}  =  inputValue;
	userAuth.authorize(password, email)
	.then((res) => {
		if (res.token) {
			setToken(res.token);
			setIsLoggedIn(true);
			tokenCheck();
			//history.push('/');
			closeAllPopups ();
			resetForm();
			}
	})
	.catch((err) => {
		setErrorMessage(err);
		console.log(err)
	});
}


function handleSubmitOnRegister () {
	const {password, email, name}  =  inputValue;
	userAuth.register(password, email, name)
		.then((data) => {
			//console.log(data);
			if (data) {
				closeAllPopups();
				setIsInfoPopupOpen(true);
			}
		})
		.catch((err) => {
			setErrorMessage(err);
			console.log(err)});
}

function handleCardSave (card) {
	//console.log(card);
	userAuth.createCard(card)
	.then((newCard) => {
		const tmpCards =  {
					"source" : { 
							"id": newCard.source,
							"name": newCard.source
						},
					"title": newCard.title,
					"description":  newCard.text,
					"url": newCard.link,
					"urlToImage": newCard.image,  
					"publishedAt":  newCard.date,
					"keyword" : newCard.keyword,
					"_id" : newCard._id
				};
		setSavedCards([tmpCards, ...savedCards]); 
// ?
	})
	.catch(err=>console.log(err));
}


function selectCard(link) {
	const saved = savedCards.find(function(item) {
		return item.url === link;
	});
			return saved;
}


function handleCardDelete(id) {
	userAuth.deleteCard(id)
		.then(() => {
			const newCards = savedCards.filter(c => c._id !== id);
			setSavedCards(newCards);
		})
		.catch(err=>console.log(err));
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


useEffect(() => {
	resetForm();
}, [isLoginPopupOpen, isRegistrPopupOpen]);

const [inputValue, setValues] = React.useState({});
const [errors, setErrors] = React.useState({});
const [isValid, setIsValid] = React.useState(false);


const handleChange = (event) => {
const target = event.target;
const name = target.name;
const value = target.value;
setValues({...inputValue, [name]: value});
setErrors({...errors, [name]: target.validationMessage });
setIsValid(target.closest("form").checkValidity());
};


const resetForm = useCallback(
(newValues = {}, newErrors = {}, newIsValid = false, newErrorMessage ={}) => {
	setValues(newValues);
	setErrors(newErrors);
	setIsValid(newIsValid);
	setErrorMessage(newErrorMessage);
	},
[setValues, setErrors, setIsValid, setErrorMessage]
);



return (
	
	<CurrentUserContext.Provider value={currentUser}>
		<div className="App">
			<div className="page">
				<Header 
					loggedIn={loggedIn} 
					savedPage={savedPage} 
					onClickSavedPage={handleSavedPage} 
					onLogin={handleOnLogin}
					onLogOut={handleOnLoguot} />


				<Switch>
					<ProtectedRoute path="/saved-news" loggedIn={loggedIn} onClickLogin={handleOnLogin}>
						<SavedNews savedPage={savedPage}  cards={savedCards} onDelete={handleCardDelete}/>
					</ProtectedRoute>


						<Route exact path="/" >
							<Main cards={cards} statusSearch={searchQuery.status} totalResults={searchQuery.totalResults} searchQuery={searchQuery.query}
							onSearch={handleOnSearch} 
							isPreload={isPreload}  
							loggedIn={loggedIn} 
							onLogin={handleOnLogin}
							onRegistration = {handleOnRegistration}
							onCardSave={handleCardSave} 
							selectCard={selectCard}
							onDelete={handleCardDelete}/>
							<About />
						</Route>


					</Switch>
				<Footer />
			</div>
			
			<PopupWithLogin 
				isOpen={isLoginPopupOpen} 
				onClose={closeAllPopups} 
				onRegistration = {handleOnRegistration} 
				onLogin={handleSubmitOnLogin} 
				handleChange={handleChange} 
				inputValue={inputValue}
				errors = {errors}
				submitStatus = {isValid}
				errorMessage= {errorMessage.statusText} />

			<PopupWithRegistation 
				isOpen={isRegistrPopupOpen} 
				onClose={closeAllPopups} 
				onLogin={handleOnLogin} 
				onRegistration={handleSubmitOnRegister} 
				handleChange= {handleChange}
				inputValue={inputValue}
				errors = {errors}
				submitStatus = {isValid}
				errorMessage= {errorMessage.statusText} />

			<PopupWithInfo isOpen={isInfoPopupOpen} onClose={closeAllPopups}  onLogin={handleOnLogin}/>

		</div>
	</CurrentUserContext.Provider>

	
	);

}

export default App;
