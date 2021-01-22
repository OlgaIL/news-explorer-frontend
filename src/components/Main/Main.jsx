import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import NoCardList from '../NoCardList/NoCardList';
import Preloader from '../Preloader/Preloader';

import './Main.css';

function Main (props) {

	const pages = Math.ceil(props.totalResults/3);

	return (
		<main className="content">
				<SearchForm  {...props} />
				{props.isPreload && <Preloader />}
				{!props.isPreload && props.totalResults ? ( <NewsCardList {...props} pages={pages} /> ) :( <NoCardList statusSearch={props.statusSearch} totalResults={props.totalResults}  isPreload={props.isPreload}/>) }
		</main>
	);
}
export default Main;
