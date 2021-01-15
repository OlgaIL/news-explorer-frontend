import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import NoCardList from '../NoCardList/NoCardList';
import Preloader from '../Preloader/Preloader';

import './Main.css';

function Main (props) {
	return (
		<main className="content">
				<SearchForm  />
				<Preloader />
				<NoCardList />
				<NewsCardList {...props} />
		</main>
	);
}
export default Main;