import React from 'react';

import NewsCardList from '../NewsCardList/NewsCardList';
import NoCardList from '../NoCardList/NoCardList';
import Preloader from '../Preloader/Preloader';

import './SavedNews.css';
import {CurrentUserContext} from '../../context/CurrentUserContext';

function SavedNews(props) {
	const currentUser = React.useContext(CurrentUserContext); // подписываем на контекст
	const  totalResults = props.cards.length;
	
	const keyWords = props.cards.map(function (item) { return item.keyword.toLowerCase(); });
	const resultKeyWord = keyWords.reduce(function (prevVal, item) {
		if (!prevVal[item]) {
		  // если ключа ещё нет в объекте, значит это первое повторение
			prevVal[item] = 1;
		} else {
		  // иначе увеличим количество повторений на 1
			prevVal[item] += 1;
		}
		// и вернём изменённый объект
		return prevVal;
	  }, []); // Начальное значение

	const totalKeyWords = Object.keys(resultKeyWord);
	

	return (
		<main className="content">
			<section className="savedHeader">
				<p className="savedHeader__text">Сохранённые статьи</p>
				<h1 className="savedHeader__title">{currentUser.name}, у вас {totalResults} сохранённых статей</h1>
				{totalResults >0 && <p className="savedHeader__text savedHeader__text_black">По ключевым словам: 
				{totalKeyWords.map((word, index)  => <span className="savedHeader__name"> {word}, </span> ) }
				 и <span className="savedHeader__name"> другим</span></p> }
			</section>

			{props.isPreload && <Preloader />}
			{!props.isPreload && totalResults > 0 ? ( <NewsCardList {...props} pages="1" totalResults={totalResults} /> ) :( <NoCardList statusSearch={totalResults} isPreload={props.isPreload} totalResults={totalResults} savedPages={props.savedPages}/>) }

		</main>
	);
}
export default SavedNews;

