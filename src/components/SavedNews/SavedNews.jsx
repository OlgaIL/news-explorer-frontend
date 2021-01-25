import React from 'react';

import NewsCardList from '../NewsCardList/NewsCardList';
import NoCardList from '../NoCardList/NoCardList';
import Preloader from '../Preloader/Preloader';

import './SavedNews.css';
import {CurrentUserContext} from '../../context/CurrentUserContext';

function SavedNews(props) {
	const currentUser = React.useContext(CurrentUserContext); // подписываем на контекст
	const  totalResults = props.cards.length;
	console.log(props.cards.length);

	
	return (
		<main className="content">
			<section className="savedHeader">
				<p className="savedHeader__text">Сохранённые статьи</p>
				<h1 className="savedHeader__title">{currentUser.name}, у вас {totalResults} сохранённых статей</h1>
				{totalResults >0 && <p className="savedHeader__text savedHeader__text_black">По ключевым словам: <span className="savedHeader__name">Природа</span>, <span className="savedHeader__name">Тайга</span> и <span className="savedHeader__name">2-м другим</span></p> }
			</section>

			{props.isPreload && <Preloader />}
			{!props.isPreload && totalResults > 0 ? ( <NewsCardList {...props} pages="1" totalResults={totalResults} /> ) :( <NoCardList statusSearch={totalResults} isPreload={props.isPreload} totalResults={totalResults} savedPages={props.savedPages}/>) }

		</main>
	);
}
export default SavedNews;

