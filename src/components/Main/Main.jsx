import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import NoCardList from '../NoCardList/NoCardList';
import Preloader from '../Preloader/Preloader';

import './Main.css';

function Main (props) {

	return (
		<main className="content">
				<SearchForm  {...props} />
				{props.isPreload && <Preloader />}
				{!props.isPreload && props.cards.length ? ( <NewsCardList {...props} /> ) :( <NoCardList statusSearch={props.statusSearch} totalResults={props.totalResults}  isPreload={props.isPreload}/>) }
		</main>
	);
}
export default Main;
