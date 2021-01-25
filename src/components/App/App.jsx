import React, { useEffect } from 'react';
import {Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import useEvent  from 'use-add-event';

import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import About from '../About/About';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'; // импортируем HOC

import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';


import api from '../../utils/NewsApi';
import {setLocal, getLocal, removeLocal} from '../../utils/local';

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
	const [searchQuery, setSearchQuery] = React.useState({query:'', status: '', totalResults: '' });
	
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
		
		const query = getLocal('searchQuery');
			if (!query) {
			return;
			}
			setSearchQuery(query);
	}

	const tokenCheck = () => {
		const jwt = getLocal('jwt');
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
				setCards(data.articles);
				
				setSearchQuery({
					query : query,
					status: data.status,
					totalResults: data.totalResults
				})

				setLocal('searchResult', data.articles);
				setLocal('searchQuery', searchQuery);


		} catch(error) { 
			console.log(error);
			setSearchQuery({
				query : query,
				status: "error",
				totalResults: 0
			})

		} finally { 
			setIsPreload(false);
		}
	}

	function handleOnLoguot(){
		setIsLoggedIn(false);
		removeLocal('jwt');
		history.push('/');
		handleNotSavedPage();
	}


	function handleSubmitOnLogin(password, email){
		userAuth.authorize(password, email)
		.then((res) => {
			if (res.token) {
				setLocal('jwt', res.token);
				setIsLoggedIn(true);
				tokenCheck();
				//history.push('/');
				closeAllPopups ();
				}
		})
		.catch((err) => {console.log(err);});
	}


	function handleSubmitOnRegister (password, email, name) {
		userAuth.register(password, email, name)
			.then((data) => {
				console.log(data);
				if (data) {
					closeAllPopups();
					setIsInfoPopupOpen(true);
				}
			})
			.catch((err) => {console.log(err)});
	}

	function handleCardSave (card) {
		console.log(card);
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

						
					<ProtectedRoute path="/saved-news" loggedIn={loggedIn}>
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
			
			<PopupWithLogin isOpen={isLoginPopupOpen} onClose={closeAllPopups} onRegistration = {handleOnRegistration} onLogin={handleSubmitOnLogin}  />
			<PopupWithRegistation isOpen={isRegistrPopupOpen} onClose={closeAllPopups} onLogin={handleOnLogin} onRegistration={handleSubmitOnRegister} />
			<PopupWithInfo isOpen={isInfoPopupOpen} onClose={closeAllPopups}  onLogin={handleOnLogin}/>

		</div>
	</CurrentUserContext.Provider>
	);

}

export default App;
