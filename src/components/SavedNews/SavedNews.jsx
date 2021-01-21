import React from 'react';

import NewsCardList from '../NewsCardList/NewsCardList';
import NoCardList from '../NoCardList/NoCardList';
import Preloader from '../Preloader/Preloader';

import './SavedNews.css';

function SavedNews(props) {
	
	return (
		<main className="content">
			<section className="savedHeader">
				<p className="savedHeader__text">Сохранённые статьи</p>
				<h1 className="savedHeader__title">Ваше Имя, у вас 5 сохранённых статей</h1>
				<p className="savedHeader__text savedHeader__text_black">По ключевым словам: <span className="savedHeader__name">Природа</span>, <span className="savedHeader__name">Тайга</span> и <span className="savedHeader__name">2-м другим</span></p>
			</section>

			<NewsCardList {...props} />
			<NoCardList />
			<Preloader />

		</main>
	);
}
export default SavedNews;

